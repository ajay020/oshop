import { Order } from './../../models/order';
import { OrderService } from './../../order.service';
import { Component, OnInit } from '@angular/core';
import { QuerySnapshot } from '@firebase/firestore';
import { map } from 'rxjs/operators';
import {  Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$!: Observable<Order[]>;

  constructor(private orderService: OrderService) { 
  }
  
  ngOnInit(): void {
    this.orders$ =  this.orderService.getOrders().pipe(map( (querySnapshot) => {
        let list : Order[] = [];
        querySnapshot.forEach( qshot =>{
            let order = qshot.data() as Order;
            list.push(order);
        })
        return list;
    }))   
  }

}
