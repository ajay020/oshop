import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from './../models/order';
import { Subscription } from 'rxjs/internal/Subscription';
import { switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  subscription! : Subscription;
  userId!: string | undefined;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

    }
    
 async ngOnInit(){
      this.subscription = this.authService.user$.pipe(switchMap(u => {
        return from (this.orderService.getOrdersByUser(u?.uid))
      }))
      .subscribe(querySnapShot =>{
        querySnapShot.forEach((doc) => {
              let order = <Order> doc.data();
              this.orders.push(order)
            });
      });
    }
}
