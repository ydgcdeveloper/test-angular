import { selectProductsList, selectProductsLoading } from '../../state/selectors/product.selectors';
import { Store } from '@ngrx/store';
import { AppState } from './../../state/app.state';
import { ProductModel } from './../../core/models/product.interface';
import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import { loadedProducts, loadProducts } from 'src/app/state/actions/product.actions';

@Component({
  selector: 'app-product-ui',
  templateUrl: './product-ui.component.html',
  styleUrls: ['./product-ui.component.css']
})
export class ProductUiComponent {
  @Input() product: ProductModel;
  showModalDelete: boolean = false;
  showModalEdit: boolean = false;

  constructor(
    private store: Store<AppState>,
    private productService: ProductService,
  ) {

  }

  removeProduct() {
    this.showModalDelete = false;
    if (this.product.id) {
      this.productService.removeProduct(this.product.id).then(() => {
        this.getProducts();
      });
    }
  }

  getProducts() {
    this.productService.getProducts().then((response: ProductModel[]) => {
      this.store.dispatch(loadedProducts({ products: response }))
    });
  }
}
