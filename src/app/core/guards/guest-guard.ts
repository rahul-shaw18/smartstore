import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const guestGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let auth = inject(Auth);

  if (auth.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
