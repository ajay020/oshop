import { Injectable } from '@angular/core';
import { Firestore, addDoc,getDoc,query, doc, collection, where, getDocs } from '@angular/fire/firestore';
import { Order } from './models/order';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firstore: Firestore) { }

  placeOrder(order:Order){
    let result =  addDoc(collection(this.firstore, 'orders'), order);
    return result;
  }

  async getOrdersByUser(uid:string | undefined){
    if(uid){
        let collref = collection(this.firstore, 'orders');
        let q =  query(collref, where('userId', '==',  uid))
        const querySnapshot = await getDocs(q)

        return querySnapshot;
    }
    return [];
  }

  getOrders(){
    return from(getDocs(collection(this.firstore, 'orders')));
  }
}
