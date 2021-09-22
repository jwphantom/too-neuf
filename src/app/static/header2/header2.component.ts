import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { io } from "socket.io-client";


@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component implements OnInit {

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
