import { Product } from 'shared/models/product';

export class ShoppingCartItem{

    $key!:string;
    title!:string;
    imageUrl!:string;
    price!:number;
    quantity!:number;
  
    constructor(init?: Partial<ShoppingCartItem>){
        Object.assign(this, init);
    }

    get totalPrice(){
        return this.price * this.quantity;
    }
}

/**
 * Partil is generic class in TypeScript. 
 * It denotes that variable can have some or all properties of type specified.
 * Here init can have few or all properties of ShoppingCart
 */