import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let auth = inject(Auth);

  if (!auth.isLoggedIn()) {
    router.navigate(['/authentication']);
    return false;
  }
  return true;
};
