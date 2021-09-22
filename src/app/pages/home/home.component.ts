import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { CookiesComponent } from '../modal/cookies/cookies.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cart: Array<string> = [];

  constructor(private title: Title,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.title.setTitle("TOO NEUF - Home");

    this.storeCart();

    this.dataBackgroundImage();

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
    this.loadScript('../assets/js/plugins/wow.min.js');
    this.loadScript('../assets/js/main.js');

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

  storeCart() {

    let cartLocal = localStorage.getItem('cart');
    if (cartLocal) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    } else {
      this.cart = [];

    }
  }

  dataBackgroundImage() {
    var bgSelector = $(".bg-img");
    bgSelector.each(function (index, elem) {
      var element = $(elem),
        bgSource = element.data('bg');
      element.css('background', 'url(' + bgSource + ')');
    });
  }


  ModalCookies() {
    const dialogRef = this.dialog.open(CookiesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
