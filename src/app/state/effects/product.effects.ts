import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product/product.service';

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

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) { }
}