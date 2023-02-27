import { ProductModel } from './core/models/product.interface';
import { selectProductsLoading } from './state/selectors/products.selector';
import { loadedProducts, loadProducts } from './state/actions/products.action';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './service/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading$: Observable<boolean> = new Observable();
  showModalAdd: boolean = false;

  constructor(
    private store: Store<any>,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectProductsLoading);

    this.store.dispatch(loadProducts())

    this.productService.getProducts().then((response: ProductModel[]) => {
      this.store.dispatch(loadedProducts({ products: response }))
    });
  }

  

}
