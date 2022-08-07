import { Component, OnInit } from '@angular/core';
import { deleteDoc, onSnapshot, Unsubscribe } from '@angular/fire/firestore';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCartService } from './../shopping-cart.service';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';
import { Order } from './../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{ 
    itemsMap :{[productId:string] : ShoppingCartItem}  = {};
    cart = {} as ShoppingCart;
    unsubscribe! : Unsubscribe;
  
  constructor(
    private shoppingCartService: ShoppingCartService){}

  async ngOnInit(){
    let query =   await this.shoppingCartService.getCart();
    
    this.unsubscribe = onSnapshot(query, (querySnapshot) =>{
        querySnapshot.forEach(doc =>{
            let d = <ShoppingCartItem>doc.data();
            this.itemsMap[doc.id] = d;
        })
        this.cart = new ShoppingCart(this.itemsMap);
     });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
