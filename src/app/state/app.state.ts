import { productsReducer } from './reducers/product.reducers';
import { ActionReducerMap } from '@ngrx/store';
import { ProductState } from './../core/models/product.state';

export interface AppState{
    products: ProductState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    products: productsReducer
}