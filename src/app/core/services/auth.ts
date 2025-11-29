import { Injectable, signal } from '@angular/core';
import { LoginResponce } from '../../shared/types/authentication-types';
@Injectable({
  providedIn: 'root',
})
export class Auth {
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
}
