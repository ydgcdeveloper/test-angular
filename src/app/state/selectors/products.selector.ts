import { ProductState } from './../../core/models/product.state';
import { AppState } from './../app.state';
import { createSelector } from '@ngrx/store';


export const selectProductsFeature = (state: AppState) => state.products;

export const selectProductsList = createSelector(
  selectProductsFeature,
  (state: ProductState) => state.products
);

export const selectProductsLoading = createSelector(
    selectProductsFeature,
    (state: ProductState) => state.loading
  );