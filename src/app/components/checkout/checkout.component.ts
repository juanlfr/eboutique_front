import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckoutFormService } from '../../services/checkout-form.service';
import { FormValidator } from '../../validators/form-validator';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  isShippingAddressBillingAddress: boolean = true;
  creditCartExpirationYears: number[] = [];
  countries: string[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  constructor(private formBuilder: FormBuilder,
              private formService: CheckoutFormService, 
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }
  ngOnInit(): void {
    this.reviewCartTotals();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(1), FormValidator.validateNotWhitespaces]),
        lastName:  new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email])
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        country: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        country: ['']
      }),
      paymentMethod: this.formBuilder.group({
        nameOnCard: new FormControl('', [Validators.required, FormValidator.validateNotWhitespaces]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{16}"), FormValidator.validateNotWhitespaces]),
        expirationMonth: [''],
        expirationYear: [''],
        cvv: new FormControl('', [Validators.required, Validators.pattern("[0-9]{3}"), FormValidator.validateNotWhitespaces])
      })
    });
    this.populateFormYears();
    this.populateFormCountries();
  }
  reviewCartTotals() {
    this.cartService.totalPrice.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
      }
    );
    this.cartService.totalQuantity.subscribe(totalQuantity => {
      this.totalQuantity = totalQuantity;
      }
    );
  }
  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email(){
    return this.checkoutFormGroup.get('customer.email');
  }
  get nameOnCard(){
    return this.checkoutFormGroup.get('paymentMethod.nameOnCard');
  }
  get cardNumber(){
    return this.checkoutFormGroup.get('paymentMethod.cardNumber');
  }
  get expirationMonth(){
    return this.checkoutFormGroup.get('paymentMethod.expirationMonth');
  }
  get expirationYear(){
    return this.checkoutFormGroup.get('paymentMethod.expirationYear');
  }
  get cvv(){
    return this.checkoutFormGroup.get('paymentMethod.cvv');
  }
  populateFormCountries() {
    this.formService.getCountries().subscribe(countries => {
      console.log('countries', countries);  // Assuming countries is an array of strings
      this.countries = countries;
    });
  }
  populateFormYears() {
    this.formService.getYearsForCreditCardExpirationDate().subscribe( 
      years => this.creditCartExpirationYears = years);
  }
  onSubmit() {
    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched(); //displays the form errors messages
    } else {
      this.buildPurchase();
      console.log('onSubmit');
    }
    
  }
  buildPurchase() {
    // Intantiate Order
    let order = new Order();
    order.totalQuantity = this.totalQuantity;
    order.totalPrice = this.totalPrice;
    //get cart items
    let cartItems = this.cartService.cartItems;
    //create order item from cart items
    let orderItems: OrderItem[] = cartItems.map(item => new OrderItem(item));   
    //Set up purchase
    let purchase = new Purchase();
    //populate purchase customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    //populate purchase billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    this.copyAddressValues();
    //populate purchase shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    //populate purchase order
    purchase.order = order;
    //populate purchase order items
    purchase.orderItems = orderItems;
    //Call rest api
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`order received. With tracking number: ${response.orderTrackingNumber}`);
        //go back to home page after successful order placement
        this.router.navigateByUrl('/products'); 
        console.log("Order placement redirection");
        this.resetCart(); // clear cart after successful order placement
        
       
      },
      error: (error) => {
        alert('Error placing order:' + error);
      }
    })


  }
  resetCart() {
    //reset cartService data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    //reset form
    this.checkoutFormGroup.reset();
  }
  copyshippingAddress(event: Event) {
    console.log('copyshippingAddress');
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.copyAddressValues();
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.isShippingAddressBillingAddress = false;
    }
    console.log('isShippingAddressBillingAddress' + this.isShippingAddressBillingAddress);
  }
  copyAddressValues(){
    console.log('copyshippingAddress');
    this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.isShippingAddressBillingAddress = true;
  }
}

