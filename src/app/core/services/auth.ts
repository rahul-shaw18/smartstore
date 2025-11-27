import { Injectable, signal } from '@angular/core';
import { LoginResponce } from '../../feature/authentication/types/authentication-types';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly user: string | null = localStorage.getItem('user');
  public isLoggedIn = signal(this.user ? true : false);

  public login(user: LoginResponce) {
    localStorage.setItem('user', JSON.stringify(user));
    this.isLoggedIn.set(true);
  }

  public logout() {
    localStorage.removeItem('user');
    this.isLoggedIn.set(false);
  }
}
