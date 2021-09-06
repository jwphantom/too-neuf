import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProduitService } from 'src/app/services/produits.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit {

  produits : any[];
  produitSubscription : Subscription;
  cart: Array<string> = [];
  orderSend : boolean = false

  
  constructor(public produitService : ProduitService,
              public router : Router,
              public dialog: MatDialog) {
    this.storeCart();

   }

  ngOnInit() {

    this.produitSubscription = this.produitService.produitsSubject.subscribe(
      (produits: any[]) => {
        this.produits = produits;
      }
    );
    this.produitService.emitProduitsSubject();
  }

  storeCart(){

    let cartLocal = localStorage.getItem('cart');
    if (cartLocal) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    } else {
      this.cart = [];

    }
  }

  onViewProduct(id : number){

    this.dialog.closeAll();
    this.router.navigate(['/create-own', id]);


  }

  


}
