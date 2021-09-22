import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Array<string> = [];

  @Input() totalHT: string;


  constructor(private produitService: ProduitService,
    private route: ActivatedRoute,
    private title: Title) { }


  ngOnInit() {


    this.storeCart();
    this.title.setTitle("TOONEUF - Panier");

    this.calculatebill()


    this.loadToolbar();
    this.loadScript('../assets/js/vendor/modernizr-2.8.3.min.js');
    this.loadScript('../assets/js/vendor/jquery-3.5.1.min.js');
    this.loadScript('../assets/js/vendor/jquery-migrate-3.3.0.min.js');
    this.loadScript('../assets/js/vendor/bootstrap.min.js');
    this.loadScript('../assets/js/plugins/fullpage.min.js');
    this.loadScript('../assets/js/plugins/slick.min.js');
    this.loadScript('../assets/js/plugins/countdown.min.js');
    this.loadScript('../assets/js/plugins/magnific-popup.js');
    this.loadScript('../assets/js/plugins/easyzoom.js');
    this.loadScript('../assets/js/plugins/images-loaded.min.js');
    this.loadScript('../assets/js/plugins/isotope.min.js');
    this.loadScript('../assets/js/plugins/YTplayer.js');
    this.loadScript('../assets/js/plugins/wow.min.js');
    this.loadScript('../assets/js/main.js');

  }

  storeCart() {

    let cartLocal = localStorage.getItem('cart');
    if (cartLocal) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      if (this.cart.length == 0) {
        $('#flash-empty-cart').show();
        setTimeout(function () {
          $('#flash-empty-cart').hide();
        }, 3000);
      }
    } else {
      this.cart = [];
      if (this.cart.length == 0) {
        $('#flash-empty-cart').show();
        setTimeout(function () {
          $('#flash-empty-cart').hide();
        }, 3000);
      }
    }
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  remove(c, i) {
    this.cart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  calculatebill() {
    let montant = 0;
    for (let i = 0; i < this.cart.length; i++) {
      montant = montant + this.cart[i][0]['price'] * this.cart[i][0]['qty'];
    }
    this.totalHT = (Math.round(montant * 100) / 100).toFixed(2);
  }

  loadToolbar() {

    /*----------------------------------------*/
    /*  Toolbar Button
      /*----------------------------------------*/
    var $overlay = $('.global-overlay');
    $('.toolbar-btn').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var $this = $(this);
      var target = $this.attr('href');
      var prevTarget = $this.parent().siblings().children('.toolbar-btn').attr('href');
      $(target).toggleClass('open');
      $(prevTarget).removeClass('open');
      $($overlay).addClass('overlay-open');
    });/*----------------------------------------*/
    /*  Close Button Actions
      /*----------------------------------------*/
    $('.btn-close, .btn-close-2, body .global-overlay').on('click', function (e) {
      var dom = $('body').children();
      e.preventDefault();
      var $this = $(this);
      $this.parents('.open').removeClass('open');
      dom.find('.global-overlay').removeClass('overlay-open');
    });

  }


}
