import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { homeResolver } from './core/resolver/home-resolver';

export const routes: Routes = [
  {
    path: 'authentication',
    title: 'Authentication',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./feature/authentication/authentication').then((c) => c.Authentication),
  },
  {
    path: '',
    title: 'Home',
    canActivate: [authGuard],
    resolve: {
      home: homeResolver,
    },
    loadComponent: () => {
      return import('./feature/home/home').then((c) => c.Home);
    },
    children: [
      {
        path: '',
        title: 'Products',
        loadComponent: () =>
          import('./feature/home/components/products/products').then((c) => c.Products),
      },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
