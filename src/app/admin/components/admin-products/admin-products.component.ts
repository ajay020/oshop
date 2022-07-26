import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products! : Product[];
  filteredProducts! : Product[];
  subscription!: Subscription;

  constructor(private productService: ProductService) { 
    this.subscription = productService.getAll()
        .subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query:any){
    this.filteredProducts = query? 
        this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())):
        this.products;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
