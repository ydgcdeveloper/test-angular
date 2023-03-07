import { ProductModel } from 'src/app/core/models/product.interface';
import { addedProduct, updatedProduct } from './../actions/product.actions';
import { ProductState } from '../../core/models/product.state';
import { loadedProducts, loadProducts } from '../actions/product.actions';
import { createReducer, on } from '@ngrx/store';


export const initialState: ProductState = { loading: false, products: [] }

export const productsReducer = createReducer(
    initialState,
    on(loadProducts, (state) => { return { ...state, loading: true } }),
    on(loadedProducts, (state, { products }) => { return { ...state, loading: false, products } }),
    on(addedProduct, (state, { newProduct }) => {
        return { ...state, products: [...state.products, newProduct] };
    }),
    on(updatedProduct, (state, { product }) => {
        let products = [...state.products]
        let index: number = products.findIndex((p) => p.id == product.id);
        if (index) {
            products[index] = product;
        }
        return { ...state, products }
    }),
    // on(updatedProduct, (state, { product }) => {
    //     let products: ProductModel[] = [...state.products].filter((p) => p.id != product.id);
    //     // products.filter((p) => { return p.id != product.id })
    //     return { ...state, products }
    // })
);