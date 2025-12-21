import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { Api } from '../../core/services/api';
import { Sidenav } from './components/sidenav/sidenav';
import { User } from '../../shared/types/user-type';
import { Product } from '../../shared/types/product-type';
import { Category } from '../../shared/types/category-type';
import { Brand } from '../../shared/types/brand-type';
import { HomeService } from './services/home-service';

@Component({
  selector: 'app-home',
  imports: [Sidenav, MatButtonModule, MatSidenavModule, MatIcon, RouterOutlet],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private homeService = inject(HomeService);
  protected readonly currentUserDetails = this.homeService.currentUserDetails;

  protected readonly products = this.homeService.products;
  protected readonly categories = this.homeService.categories;

  protected readonly minPriceOfProduct = this.homeService.minPriceOfProduct;
  protected readonly maxPriceOfProduct = this.homeService.maxPriceOfProduct;

  protected readonly brands = this.homeService.brands;

  ngOnInit(): void {

    
  }
}
