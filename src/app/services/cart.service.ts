import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: CartItem[] = [];
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  storage: Storage = localStorage;


  constructor() {
    //read data from storage
    //Conversion of JSON to JS object
    let data = JSON.parse(this.storage.getItem('cartItems')!);
    if (data != null) {
      this.cartItems = data;
      //compute totals based on the data that is read from storage
      this.computeCartItemTotals();
    }
   }

  addTocart(cartItem: CartItem) {
    //Check if we already have the item in the cart.If the item is already in the cart, increment the quantity
    let existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);
    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }
    this.computeCartItemTotals();

  }
  computeCartItemTotals() {
    let totalQuantity = 0;
    let totalPrice = 0;
    for (let cartItem of this.cartItems) {
      totalQuantity += cartItem.quantity;
      totalPrice += cartItem.unitPrice * cartItem.quantity;
    }
    //To publish the event that is like an observable
    this.totalQuantity.next(totalQuantity);
    this.totalPrice.next(totalPrice);
    //persist cart data in storage
    this.persistCartItems();
  }
  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.removeFromCart(cartItem);
    } else {
      this.computeCartItemTotals();
    }
  }
  removeFromCart(cartItem: CartItem) {
    let index = this.cartItems.indexOf(cartItem);
    if (index > -1) { // only splice array when item is found
      this.cartItems.splice(index, 1); // 2nd parameter means remove one item only
    }
    this.computeCartItemTotals();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

}
