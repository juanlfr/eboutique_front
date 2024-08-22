import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {




  cartItemsDetails: CartItem[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }


  ngOnInit(): void {
    this.listCartItemsDetails();
  }
  listCartItemsDetails() {
    //handle items
    this.cartItemsDetails = this.cartService.cartItems;
    //subcribe to price and quantity
    this.cartService.totalPrice.subscribe(price => {
      this.totalPrice = price;
    });
    this.cartService.totalQuantity.subscribe(items => {
      this.totalItems = items;
    });
    this.cartService.computeCartItemTotals();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addTocart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  removeItem(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
  }


}
