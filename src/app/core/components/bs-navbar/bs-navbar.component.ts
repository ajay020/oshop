import { Component, OnInit } from '@angular/core';
import { Auth, signOut, authState} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { onSnapshot } from '@angular/fire/firestore';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser!: AppUser | null;
  shoppingCartItemCount!:number;
  cart = {} as ShoppingCart;

  constructor(public auth : AuthService, private cartSevice: ShoppingCartService) {
    auth.appUser.subscribe(user =>   this.appUser = user);
  }

  async ngOnInit() {
     const query = await this.cartSevice.getCart()

     onSnapshot(query, (querySnapshot) =>{
        this.shoppingCartItemCount = 0;
            querySnapshot.forEach((doc) =>{
                let d = doc.data();
                this.shoppingCartItemCount += d?.['quantity'];
            })
     } )
  }

  
  logout(){
   this.auth.logout();
  }
}


/**
 * 
 * Never forget to unsubscribe when using firebase.
 * In case of HttpClient, angular take of it.
 */