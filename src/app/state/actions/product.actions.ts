import { createAction, props } from "@ngrx/store"
import { ProductModel } from "src/app/core/models/product.interface";

export const loadProducts = createAction(
    '[Products list] Load products'
);

export const loadedProducts = createAction(
    '[Products list] Products Loaded Success',
    props<{ products: ProductModel[] }>()
)