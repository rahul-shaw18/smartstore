import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardImage } from '@angular/material/card';
import { HomeService } from '../../services/home-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ProductFilterPipe } from '../pipes/product-filter-pipe';

@Component({
  selector: 'app-products',
  imports: [
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardImage,
    ReactiveFormsModule,
    ProductFilterPipe,
  ],
  templateUrl: './products.html',
})
export class Products implements OnInit {
  protected readonly homeService = inject(HomeService);
  protected readonly products = this.homeService.products;

  inputControl = new FormControl('');
  protected searchTitle = signal('');

  ngOnInit(): void {
    this.inputControl.valueChanges.pipe(debounceTime(300)).subscribe((val) => {
      console.log(val);
      this.searchTitle.set(val || '')
    });
  }
}
