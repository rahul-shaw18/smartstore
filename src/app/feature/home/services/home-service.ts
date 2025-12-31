import { inject, Injectable, signal } from '@angular/core';
import { Api } from '../../../core/services/api';
import { User } from '../../../shared/types/user-type';
import { Product } from '../../../shared/types/product-type';
import { Category } from '../../../shared/types/category-type';
import { Brand } from '../../../shared/types/brand-type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private api = inject(Api);

  public readonly currentUserDetails = signal<User | null>(null);

  public readonly products = signal<Product[] | []>([]);
  public readonly categories = signal<Category[] | []>([]);

  public readonly minPriceOfProduct = signal<number>(Infinity);
  public readonly maxPriceOfProduct = signal<number>(-Infinity);

  public readonly brands = signal<Brand[]>([]);

  public getCurrentUser$() {
    return this.api.currentUser().pipe(
      tap((res) => {
        this.currentUserDetails.set(res);
      })
    );
  }

  public getProducts$() {
    return this.api.products().pipe(
      tap((res) => {
        let min = Infinity;
        let max = -Infinity;
        const brandSet = new Set<string>();

        for (const p of res.products) {
          min = Math.min(min, p.price);
          max = Math.max(max, p.price);
          if (p.brand) brandSet.add(p.brand);
        }

        this.products.set(res.products);
        this.minPriceOfProduct.set(min);
        this.maxPriceOfProduct.set(max);

        this.brands.set(
          [...brandSet].map((name, index) => ({
            id: index + 1,
            name,
            isSelected: false,
          }))
        );
      })
    );
  }

  public getCategories$() {
    return this.api.categories().pipe(
      tap((res) => {
        this.categories.set(res);
      })
    );
  }
}
