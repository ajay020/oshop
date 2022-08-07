import { Component, Input, OnInit } from '@angular/core';
import { deleteDoc, onSnapshot } from '@angular/fire/firestore';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';
import { Order } from './../models/order';
import { Router } from '@angular/router';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { Unsubscribe } from '@angular/fire/app-check';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
    @Input('cart') cart = {} as ShoppingCart;

    shipping: any = {}; 
    userId! : string|undefined;
    unsubscribe! : Unsubscribe;
    userSubscription!: Subscription;

    constructor(
        private router:Router,
        private authService: AuthService,
        private shoppingCartService: ShoppingCartService,
        private orderService: OrderService,){
        }

  ngOnInit(): void {
    this.userSubscription =  this.authService.user$.subscribe(user => this.userId = user?.uid) ;
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder({...order});

    // clear cart after placing order
    this.clearCart();

    // direct to order success page after placing the order
    this.router.navigate(['order-success', result.id]);
  }    

 async clearCart(){
    const query  = await this.shoppingCartService.clearCart(); 

      this.unsubscribe = onSnapshot(query, (querySnapshot) =>{
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "removed") {
                this.cart = new ShoppingCart({});
            }
        });
        querySnapshot.forEach(doc =>{
           deleteDoc(doc.ref);
        })
     }) 
  }

  ngOnDestroy(): void {
    if(this.unsubscribe){
        this.unsubscribe();
    }
    this.userSubscription.unsubscribe();
  }

}
