import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../shopping-cart.service';
import { deleteDoc, onSnapshot } from '@angular/fire/firestore';
import { Unsubscribe } from '@angular/fire/app-check';
import { ShoppingCartItem } from './../models/shopping-cart-item';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

    itemsMap :{[productId:string] : ShoppingCartItem}  = {};
    cart = {} as ShoppingCart;
    unsubscribe! : Unsubscribe;

  constructor(private shoppingCartService: ShoppingCartService) {
   }

   async ngOnInit(){
    let query =   await this.shoppingCartService.getCart();
    
    this.unsubscribe = onSnapshot(query, (querySnapshot) =>{
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "removed") {
                delete this.itemsMap[change.doc.id];
            }
        });
        
        querySnapshot.forEach(doc =>{
            let d = <ShoppingCartItem>doc.data();
            this.itemsMap[doc.id] = d;
        })
        this.cart = new ShoppingCart(this.itemsMap);
     }) 
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
       this.unsubscribe();
   }
}
