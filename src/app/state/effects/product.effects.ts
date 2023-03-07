import { updatedProduct, updateProduct } from './../actions/product.actions';
import { ProductModel } from './../../core/models/product.interface';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, switchMap, tap, concatMap } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product/product.service';
import { addedProduct, addProduct } from '../actions/product.actions';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType('[Products list] Load products'),
    mergeMap(() => from(this.productService.getProducts())
      .pipe(
        map(products => ({ type: '[Products list] Products Loaded Success', products })),
        catchError(() => EMPTY)
      ))
  )
  );

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(addProduct),
    concatMap(({ newProduct }) => {
      return from(this.productService.addProduct(newProduct)).pipe(
        map((newProduct) => addedProduct({ newProduct })),
        catchError(() => EMPTY)
      )
    })
  )
  );

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(updateProduct),
    concatMap(({ product }) => {
      return from(this.productService.updateProduct(product)).pipe(
        map(() => updatedProduct({ product })),
        tap((p) => console.log(p)),
        catchError(() => EMPTY)
      )
    })
  )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) { }
}