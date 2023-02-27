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

  constructor(
    private store: Store<any>,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectProductsLoading);

    this.store.dispatch(loadProducts())

    this.productService.getProducts().then((response: ProductModel[]) => {
      console.log('value', response);
      this.store.dispatch(loadedProducts({ products: response }))
    });

    // this.productService.addProduct();
    // this.productService.removeProduct('bJnw8B8qXGDudC5TCTjj').then((value) => {
    //   console.log('value deleted', value);
    // });
  }

}
