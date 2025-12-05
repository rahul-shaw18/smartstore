import { Component, inject, input, OnInit, signal } from '@angular/core';
import { User } from '../../../../shared/types/user-type';
import { MatListModule } from '@angular/material/list';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardHeader } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Category } from '../../../../shared/types/category-type';
import { Product } from '../../../../shared/types/product-type';
import { MatSliderModule } from '@angular/material/slider';
import { Brand } from '../../../../shared/types/brand-type';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatListModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatSliderModule,
  ],
  templateUrl: './sidenav.html',
})
export class Sidenav{
  public readonly currentUser = input.required<User | null>();
  public readonly product = input.required<Product[] | []>();
  public readonly categories = input.required<Category[] | []>();
  public readonly brands = input.required<Brand[] | []>();
  public readonly minPriceOfProduct = input.required<number>();
  public readonly maxPriceOfProduct = input.required<number>();

}
