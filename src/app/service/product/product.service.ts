import { Observable } from 'rxjs';
import { ProductModel } from './../../core/models/product.interface';
import { Injectable } from '@angular/core';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { db } from 'src/app/firebase/firebase';
import { of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  async getProducts(): Promise<any> {
    const productsCol = collection(db, 'product');
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id
      }
    });
    return productList;
  }

  async addProduct(product: ProductModel): Promise<ProductModel> {
    const productsCol = collection(db, 'product');
    const res = await addDoc(productsCol,
      product
    );
    console.log("res",res);
    return { ...product, id: res.id };
  }

  async removeProduct(productId: string): Promise<void> {
    const product = doc(db, 'product', productId);
    return await deleteDoc(product);
  }

  async updateProduct(product: any): Promise<ProductModel> {
    const productDoc = doc(db, 'product', product.id);
    const { id, ...data } = product;
    const res = await updateDoc(productDoc, data);
    return product;
  }
}
