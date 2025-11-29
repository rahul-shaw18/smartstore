import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { REFRESH_TOKEN, UNAUTHORIZED_ACCESS_CODE } from '../constants/constants';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const user = auth.getUserDetails();
  const token = user?.accessToken;

  // attach access token
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // if 401 & it's NOT refresh request → try refreshing
      if (error.status === UNAUTHORIZED_ACCESS_CODE && !req.url.includes(REFRESH_TOKEN)) {
        return handle401Request(auth, req, next);
      }

      return throwError(() => error);
    })
  );
};

function handle401Request(auth: Auth, req: any, next: any): Observable<any> {
  if (!isRefreshing) {
    // start refreshing
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return auth.refreshToken().pipe(
      switchMap((newAccessToken: string) => {
        isRefreshing = false;
        refreshTokenSubject.next(newAccessToken);

        // retry original request with new access token
        const clonedReq = req.clone({
          setHeaders: { Authorization: `Bearer ${newAccessToken}` },
        });

        return next(clonedReq);
      }),
      catchError((err) => {
        // refresh failed → logout immediately
        isRefreshing = false;
        auth.logout();
        return throwError(() => err);
      })
    );
  } else {
    // Already refreshing → wait for new access token
    return refreshTokenSubject.pipe(
      filter((t) => t !== null),
      take(1),
      switchMap((newToken) => {
        const clonedReq = req.clone({
          setHeaders: { Authorization: `Bearer ${newToken}` },
        });
        return next(clonedReq);
      })
    );
  }
}
