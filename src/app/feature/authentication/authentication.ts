import { Component, inject, signal } from '@angular/core';
import { form, Field, required, minLength } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Api } from '../../core/services/api';
import { Auth } from '../../core/services/auth';
import { LoginForm } from './types/authentication-types';

@Component({
  selector: 'app-authentication',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    Field,
  ],
  templateUrl: './authentication.html',
})
export class Authentication {
  private readonly api = inject(Api);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  protected responceError = signal<string | null>(null);

  protected loginModel = signal<LoginForm>({
    username: 'emilys',
    password: 'emilyspass',
  });

  protected readonly loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username, { message: 'Username is required' });
    minLength(schemaPath.username, 3, { message: 'The minimum length should be 3' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  protected onLogin() {
    this.api.login(this.loginForm.username().value(), this.loginForm.password().value()).subscribe({
      next: (res) => {
        this.auth.login(res);
        this.router.navigate(['/']);
      },
      error: (errorRes) => {
        this.responceError.set(errorRes.error.message);
      },
    });
  }

  protected onClear() {
    this.loginModel.set({
      username: 'emilys',
      password: 'emilyspass',
    });
  }

  protected handleInput() {
    this.responceError.set(null);
  }
}
