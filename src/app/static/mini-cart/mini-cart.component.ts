import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {

  cart: Array<string> = [];
  @Input() totalHT : number;


  constructor() { }

  ngOnInit() {

    this.storeCart();
    this.calculatebill()


  }

  storeCart(){
    console.log('yo');

    let cartLocal = localStorage.getItem('cart');
    if (cartLocal) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      console.log(this.cart);
    } else {
      this.cart = [];
      console.log(this.cart);

    }
  }

  remove(i) {
    this.cart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  calculatebill() {
    let montant = 0;
    for (let i = 0; i < this.cart.length; i++) {
      montant = montant + this.cart[i][0]['price'] * this.cart[i][0]['qty'];
    }
    this.totalHT = montant;
  }

}
