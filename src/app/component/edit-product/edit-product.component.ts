import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/core/models/product.interface';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { loadedProducts } from 'src/app/state/actions/products.action';
import { Store } from '@ngrx/store';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() product: ProductModel;
  @Output() showModalEdit = new EventEmitter<boolean>(true);

  public productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private productService: ProductService,
  ) {

  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [this.product?.name, [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú ]*')]],
      price: [this.product?.price, [Validators.required, Validators.min(100), Validators.pattern('[a-zA-Z0-9]*')]],
      serialNumber: [this.product?.serialNumber, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
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
    this.showModalEdit.emit(false);
  }

  editProduct() {
    this.showModalEdit.emit(false);

    const product: ProductModel = {
      name: this.name?.value,
      price: this.price?.value,
      serialNumber: this.serialNumber?.value,
    };

    try {
      if (this.product.id) {
        this.productService.updateProduct(this.product.id, product).then((value) => {
          this.getProducts();
        });
      }
    } catch (error) {
    }
  }

  getProducts() {
    this.productService.getProducts().then((response: ProductModel[]) => {
      this.store.dispatch(loadedProducts({ products: response }))
    });
  }
}
