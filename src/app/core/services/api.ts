import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CATEGORIES, CURRENT_USER, LOGIN, PRODUCTS, REFRESH_TOKEN } from '../constants/constants';
import { LoginResponce } from '../../shared/types/authentication-types';
import { User } from '../../shared/types/user-type';
import { ProductResponse } from '../../shared/types/product-type';
import { Category } from '../../shared/types/category-type';

export type RefreshTokenResponce = {
  accessToken: string;
  refreshToken: string;
};

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly http = inject(HttpClient);

  public login(username: string, password: string): Observable<LoginResponce> {
    return this.http.post<LoginResponce>(`${environment.BASE_URL}${LOGIN}`, {
      username: username,
      password: password,
    });
  }

  public currentUser(): Observable<User> {
    return this.http.get<User>(`${environment.BASE_URL}${CURRENT_USER}`);
  }

  public refreshToken(refreshToken: string): Observable<RefreshTokenResponce> {
    return this.http.post<RefreshTokenResponce>(`${environment.BASE_URL}${REFRESH_TOKEN}`, {
      refreshToken,
    });
  }

  public products(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${environment.BASE_URL}${PRODUCTS}`);
  }

  public categories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.BASE_URL}${PRODUCTS}${CATEGORIES}`);
  }
}
