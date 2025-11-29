import { inject, Injectable, signal } from '@angular/core';
import { LoginResponce } from '../../shared/types/authentication-types';
import { Api, RefreshTokenResponce } from './api';
import { map, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly api = inject(Api);
  private readonly userSignal = signal<string | null>(localStorage.getItem('user'));
  public isLoggedIn = signal(!!this.userSignal());

  public login(user: LoginResponce) {
    const json = JSON.stringify(user);
    localStorage.setItem('user', json);
    this.userSignal.set(json);
    this.isLoggedIn.set(true);
  }

  public logout() {
    localStorage.removeItem('user');
    this.userSignal.set(null);
    this.isLoggedIn.set(false);
  }

  public getUserDetails(): LoginResponce | null {
    const stored = this.userSignal();
    if (!stored) return null;
    return JSON.parse(stored);
  }

  public refreshToken() {
    const userDetails = this.getUserDetails();
    const rfToken = userDetails?.refreshToken;

    if (!rfToken) {
      return throwError(() => new Error('No refresh token'));
    }

    return this.api.refreshToken(rfToken).pipe(
      tap((res: RefreshTokenResponce) => {
        const updated = {
          ...(userDetails ?? {}),
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        };
        const json = JSON.stringify(updated);
        localStorage.setItem('user', json);
        this.userSignal.set(json);
        this.isLoggedIn.set(true);
      }),
      map((res: RefreshTokenResponce) => res.accessToken)
    );
  }
}
