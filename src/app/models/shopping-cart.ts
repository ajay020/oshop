
import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';


export class ShoppingCart{
    items:ShoppingCartItem[]= [];

    constructor(public itemsMap : {[key:string]: ShoppingCartItem}){
        this.itemsMap = itemsMap || {};

        for(let productId in itemsMap){
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({...item, $key: productId,}));
        }
    }

    getQuantity(product: Product){
        let item  = this.itemsMap[product.$key];
        return item ? item.quantity: 0;
      }

    get totalPrice(){
        let sum = 0;
        this.items.forEach(item =>{
            sum+= item.totalPrice;
        })
        return sum;
    }

    get totalItemCount(){
        let count = 0;
        this.items.forEach(item =>{
            count += item.quantity;
        })
        return count;
    }

}