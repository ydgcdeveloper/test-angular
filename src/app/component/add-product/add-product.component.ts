import { ProductModel } from 'src/app/core/models/product.interface';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { loadedProducts } from 'src/app/state/actions/products.action';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  @Output() showModalAdd = new EventEmitter<boolean>(true);
  public productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private productService: ProductService,
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú ]*')]],
      price: ['', [Validators.required, Validators.min(100), Validators.pattern('[a-zA-Z0-9]*')]],
      serialNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    })
  }

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  get serialNumber() {
    return this.productForm.get('serialNumber');
  }

  hideModal() {
    this.showModalAdd.emit(false);
  }

  addProduct() {
    this.showModalAdd.emit(false);

    const product: ProductModel = {
      name: this.name?.value,
      price: this.price?.value,
      serialNumber: this.serialNumber?.value,
    };

    try {
      this.productService.addProduct(product).then((value) => {
        this.getProducts();
      });
    } catch (error) {
    }
  }

  getProducts() {
    this.productService.getProducts().then((response: ProductModel[]) => {
      this.store.dispatch(loadedProducts({ products: response }))
    });
  }
}
