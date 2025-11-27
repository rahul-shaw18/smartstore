import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path: 'authentication',
    title: 'Authentication',
    canActivate:[guestGuard],
    loadComponent: () => import('./feature/authentication/authentication').then(c=> c.Authentication),
  },
  {
    path: '',
    title: 'Home',
    canActivate: [authGuard],
    loadComponent: () => {return import('./feature/home/home').then(c=> c.Home)},
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
