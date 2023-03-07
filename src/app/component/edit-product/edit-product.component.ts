import { updateProduct } from './../../state/actions/product.actions';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Validator } from './../../validator/validator';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ProductModel } from 'src/app/core/models/product.interface';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { loadedProducts } from 'src/app/state/actions/product.actions';
import { Store } from '@ngrx/store';
import { ProductService } from 'src/app/service/product/product.service';
import { selectProductsList } from 'src/app/state/selectors/product.selectors';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() product: ProductModel;
  @Output() showModalEdit = new EventEmitter<boolean>(true);

  products$: Observable<any> = new Observable();

  public productForm: FormGroup;
  minPrice: number = 100;
  maxPrice: number = 500;
  duplicatedName = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductsList);

    this.productForm = this.formBuilder.group({
      name: [this.product?.name, [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú ]*')]],
      price: [(parseFloat(this.product?.price as string) as number).toFixed(2), [Validators.required, Validators.min(this.minPrice), Validators.max(this.maxPrice)]],
      serialNumber: [this.product?.serialNumber, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[a-zA-Z0-9]*')]],
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
    const product: ProductModel = {
      id: this.product.id,
      name: this.name?.value,
      price: this.price?.value,
      serialNumber: this.serialNumber?.value,
    };

    this.products$.subscribe((value) => {
      this.duplicatedName = (value as Array<ProductModel>).map((product: ProductModel) => product.name).filter((name) => {
        return name == product.name;
      })
        .length > 1

      if (!this.duplicatedName) {
        this.showModalEdit.emit(false);

        try {
          if (this.product.id) {
            this.store.dispatch(updateProduct({ product }))
          }
        } catch (error) {
        }
      }
    })
      .unsubscribe();
  }
}
