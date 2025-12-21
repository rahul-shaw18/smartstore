import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardImage } from '@angular/material/card';
import { HomeService } from '../../services/home-service';

@Component({
  selector: 'app-products',
  imports: [MatCard, MatCardContent, MatCardFooter, MatCardImage],
  templateUrl: './products.html',
})
export class Products {
  protected readonly homeService = inject(HomeService)
  protected readonly products = this.homeService.products
}
