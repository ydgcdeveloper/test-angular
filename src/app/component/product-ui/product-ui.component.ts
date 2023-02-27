import { ProductModel } from './../../core/models/product.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-ui',
  templateUrl: './product-ui.component.html',
  styleUrls: ['./product-ui.component.css']
})
export class ProductUiComponent {
  @Input() product: ProductModel;
}
