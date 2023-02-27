import { ProductState } from '../../core/models/product.state';
import { loadedProducts, loadProducts } from '../actions/product.actions';
import { createReducer, on } from '@ngrx/store';


export const initialState: ProductState = { loading: false, products: [] }

export const productsReducer = createReducer(
    initialState,
    on(loadProducts, (state) => { return { ...state, loading: true } }),
    on(loadedProducts, (state, { products }) => { return { ...state, loading: false, products } }),
);