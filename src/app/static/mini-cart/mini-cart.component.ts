import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io } from "socket.io-client";


@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {

  cart: Array<string> = [];
  @Input() totalHT: string;

  socket = io('https://server-too-neuf.herokuapp.com');



  constructor(private router: Router) { }

  ngOnInit() {

    this.socket.emit('cart');

    this.socket.on('refresh-cart', () => {
      this.storeCart();
      this.calculatebill();

    });


    // this.storeCart();
    // this.calculatebill()
  }

  storeCart() {

    let cartLocal = localStorage.getItem('cart');
    if (cartLocal) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    } else {
      this.cart = [];

    }
  }

  remove(i) {
    this.cart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.storeCart();
    this.calculatebill();
    this.socket.emit('cart');



  }

  calculatebill() {
    let montant = 0;
    for (let i = 0; i < this.cart.length; i++) {
      montant = montant + this.cart[i][0]['price'] * this.cart[i][0]['qty'];
    }
    this.totalHT = (Math.round(montant * 100) / 100).toFixed(2);
  }


  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
