import { Injectable, Query } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  setDoc,
  query,
  getDoc,
  getDocs,
  deleteDoc,
  onSnapshot
} from '@angular/fire/firestore';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private fireStore: Firestore) {}

  private create() {
    return addDoc(collection(this.fireStore, 'shopping-carts'), {
      dateCreated: new Date().getTime(),
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
   
    return query(collection(this.fireStore, 'shopping-carts', cartId, 'items'));
  }

  private getItem(cartId: string, productId: string) {
    return getDoc(
      doc(this.fireStore, 'shopping-carts', cartId, 'items', productId)
    );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart(){
    const cartId = await this.getOrCreateCartId();
    return query(collection(this.fireStore, 'shopping-carts', cartId, 'items'))
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item = await this.getItem(cartId, product.$key);
    let data = item.data();

    let quantity = (data?.['quantity'] || 0) + change;

    if(quantity === 0){
        deleteDoc( doc(this.fireStore, 'shopping-carts', cartId, 'items', product.$key));
    }else{
        setDoc(
            doc(this.fireStore, 'shopping-carts', cartId, 'items', product.$key),
            {
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              quantity: quantity,
            }
          );
    }

   
  }
}
