import { Component, Input, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { io } from "socket.io-client";
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cart: Array<string> = [];

  private socket = io('https://server-too-neuf.herokuapp.com');


  constructor(private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {

    this.socket.emit('cart');

    this.socket.on('refresh-cart', () => {
      this.storeCart();
    });

  }

  storeCart() {

    let cartLocal = localStorage.getItem('cart');
    if (cartLocal) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    } else {
      this.cart = [];

    }
  }

}
