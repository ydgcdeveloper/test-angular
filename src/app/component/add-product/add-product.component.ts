import { selectProductsList } from './../../state/selectors/product.selectors';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/core/models/product.interface';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { addProduct, loadedProducts, loadProducts } from 'src/app/state/actions/product.actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  products$: Observable<any> = new Observable();
  @Output() showModalAdd = new EventEmitter<boolean>(true);
  public productForm: FormGroup;
  minPrice: number = 100;
  maxPrice: number = 500;
  duplicatedName = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private productService: ProductService,
  ) {
    this.productForm = this.formBuilder.group({
      name: ['New Name', [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú ]*')]],
      price: ['104', [Validators.required, Validators.min(this.minPrice), Validators.max(this.maxPrice)]],
      serialNumber: ['hfnshry6', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[a-zA-Z0-9]*')]],
    })
  }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductsList);
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

    const product: ProductModel = {
      name: this.name?.value,
      price: this.price?.value,
      serialNumber: this.serialNumber?.value,
    };

    this.products$.subscribe((value) => {
      this.duplicatedName = (value as Array<ProductModel>).map((product: ProductModel) => product.name).filter((name) => {
        return name == product.name;
      })
        .length > 0;
      if (!this.duplicatedName) {
        this.showModalAdd.emit(false);

        try {
          this.store.dispatch(addProduct({ newProduct: product }))
        } catch (error) {
        }
      }
    })
      .unsubscribe();
  }
}
