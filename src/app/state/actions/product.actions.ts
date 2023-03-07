import { createAction, props } from "@ngrx/store"
import { ProductModel } from "src/app/core/models/product.interface";


export const GET_PRODUCTS = '[Products list] Load products';
export const GET_PRODUCTS_SUCCESS = '[Products list] Products Loaded Success';
export const GET_PRODUCTS_ERROR = '[Products list] Products Loaded Error';

export const ADD_PRODUCT = '[Product add] Add product';
export const ADD_PRODUCT_SUCCESS = '[Product add] Product added to db success';
export const ADD_PRODUCT_ERROR = '[Product add] Add product error';

export const UPDATE_PRODUCT = '[Product update] Update product';
export const UPDATE_PRODUCT_SUCCESS = '[Product Update] Update product success';
export const UPDATE_PRODUCT_ERROR = '[Product update] Update product error';


/** LOAD PRODUCT */
export const loadProducts = createAction(
    GET_PRODUCTS
);

export const loadedProducts = createAction(
    GET_PRODUCTS_SUCCESS,
    props<{ products: ProductModel[] }>()
)

export const loadedProductsError = createAction(
    GET_PRODUCTS_ERROR,
    props<{ error: Error }>()
)


/** ADD PRODUCT */
export const addProduct = createAction(
    ADD_PRODUCT,
    // (newProduct: ProductModel) => ({ newProduct })
    props<{ newProduct: ProductModel }>()
)

export const addedProduct = createAction(
    ADD_PRODUCT_SUCCESS,
    props<{ newProduct: ProductModel }>()
)

export const addedProductError = createAction(
    ADD_PRODUCT_ERROR,
    props<{ error: Error }>()
)


/** UPDATE PRODUCT */
export const updateProduct = createAction(
    UPDATE_PRODUCT,
    props<{ product: ProductModel }>()
)

export const updatedProduct = createAction(
    UPDATE_PRODUCT_SUCCESS,
    props<{ product: ProductModel }>()
)

export const updateProductError = createAction(
    UPDATE_PRODUCT_ERROR,
    props<{ error: Error }>()
)