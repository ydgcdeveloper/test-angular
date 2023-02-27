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

  async addProduct(product: ProductModel): Promise<string> {
    const productsCol = collection(db, 'product');
    const res = await addDoc(productsCol,
      product
    );
    return res.id;
  }

  async removeProduct(productId: string): Promise<void> {
    const product = doc(db, 'product', productId);
    return await deleteDoc(product);
  }

  async updateProduct(productId: string, data: {}) {
    const product = doc(db, 'product');
    const res = await updateDoc(product, data)
  }


  // getProducts(): Observable<any> {
  //   const data: ProductModel[] = [
  //     {
  //       id: 1,
  //       name: 'First One',
  //       price: 120,
  //       serialNumber: 'ofjwiohgfienpiefoefvd'
  //     }
  //   ];

  //   return of(data).pipe(
  //     delay(1500)
  //   );
  // }
}
