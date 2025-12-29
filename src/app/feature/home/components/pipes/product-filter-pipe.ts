import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../../shared/types/product-type';

@Pipe({
  name: 'productFilter',
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: Product[], search: string): Product[] {
    if (!products || !search) {
      return products;
    }

    const title = search.toLowerCase();

    return products.filter((product) => product.title.toLowerCase().includes(title));
  }
}
