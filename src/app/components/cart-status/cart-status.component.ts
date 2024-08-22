import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit {

  cartTotalQuantity: number;

  constructor(private cartService: CartService) {
    this.cartTotalQuantity = 0;
  }

  ngOnInit(): void {
    this.updateCartQuantity();
  } 
  updateCartQuantity() {
    this.cartService.totalQuantity.subscribe(
      quantity => this.cartTotalQuantity = quantity
    );
  }
  

}
