import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { login } from '../constants/constants';

import { LoginResponce } from '../../feature/authentication/types/authentication';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);

 public login(username: string, password: string): Observable<LoginResponce> {
    return this.http.post<LoginResponce>(`${environment.BASE_URL}${login}`, {
      username: username,
      password: password,
    });
  }
}
