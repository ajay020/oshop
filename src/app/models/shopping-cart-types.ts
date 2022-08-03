
import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCartType{
    items: ()=> ShoppingCartItem[];
    totalItemCount: () => number;
}