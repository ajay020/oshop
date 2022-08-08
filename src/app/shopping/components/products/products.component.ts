import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { onSnapshot } from '@angular/fire/firestore';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
    products : Product[] = [];
    filteredProducts : Product[] = [];
    category!:string | null;
    itemsMap:{[productId: string]: ShoppingCartItem} = {};
    shoppingCart  = {} as ShoppingCart ;
    unsubscribe! : any;

  constructor(
    private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    private productService: ProductService) {
      this.populateProducts();
  }


  private populateProducts(){
    
    this.productService.getAll()
    .pipe(switchMap(products => {
       this.products = products;
       return  this.route.queryParamMap;
    }))   
   .subscribe(params => {
        this.category = params.get('category') ;
        this.applyFilter()
   });
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category):
    this.products;
  }

  async ngOnInit(){
    let q = await this.cartService.getCart()
    this.unsubscribe =  onSnapshot(q, (querySnapshot) =>{
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "removed") {
                delete this.itemsMap[change.doc.id];
            }
        });

        querySnapshot.forEach((doc) => {
            this.itemsMap[doc.id] = <ShoppingCartItem>doc.data();
        });
    })
    this.shoppingCart = new ShoppingCart(this.itemsMap);
  }

  ngOnDestroy(): void {
      this.unsubscribe();
  }
}



/**
 * 
 * Keep your functions short between 5 to 10 lines.
 * it makes them easy to read and test.
 * 
 * 
 */