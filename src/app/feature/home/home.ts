import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardImage } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { Api } from '../../core/services/api';
import { Sidenav } from './components/sidenav/sidenav';
import { User } from '../../shared/types/user-type';
import { Product } from '../../shared/types/product-type';
import { Category } from '../../shared/types/category-type';
import { Brand } from '../../shared/types/brand-type';

@Component({
  selector: 'app-home',
  imports: [
    Sidenav,
    MatButtonModule,
    MatSidenavModule,
    MatIcon,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardImage,
  ],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private api = inject(Api);
  protected readonly currentUserDetails = signal<User | null>(null);

  protected readonly products = signal<Product[] | []>([]);
  protected readonly categories = signal<Category[] | []>([]);

  protected readonly minPriceOfProduct = signal<number>(Infinity);
  protected readonly maxPriceOfProduct = signal<number>(-Infinity);

  protected readonly brands = signal<Brand[]>([]);

  ngOnInit(): void {
    this.api.currentUser().subscribe({
      next: (res) => {
        this.currentUserDetails.set(res);
      },
    });

    this.api.products().subscribe({
      next: (res) => {
        let min = Infinity;
        let max = -Infinity;

        const brandSet = new Set<string>();

        for (let i = 0; i < res.products.length; i++) {
          if (res.products[i].price < min) min = res.products[i].price;
          if (res.products[i].price > max) max = res.products[i].price;

          if (res.products[i].brand) brandSet.add(res.products[i].brand);
        }

        this.products.set(res.products);
        this.minPriceOfProduct.set(min);
        this.maxPriceOfProduct.set(max);

        this.brands.set(
          Array.from(brandSet).map((name, index) => ({
            id: index + 1,
            name,
            isSelected: false,
          }))
        );
      },
    });

    this.api.categories().subscribe({
      next: (res) => {
        this.categories.set(res);
        console.log(this.categories());
      },
    });
  }
}
