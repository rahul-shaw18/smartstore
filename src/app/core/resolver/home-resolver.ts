import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HomeService } from '../../feature/home/services/home-service';
import { forkJoin, map } from 'rxjs';

export const homeResolver: ResolveFn<boolean> = () => {
  const homeService = inject(HomeService);

  return forkJoin([
    homeService.getProducts$(),
    homeService.getCategories$(),
    homeService.getCurrentUser$(),
  ]).pipe(map(() => true));
};

