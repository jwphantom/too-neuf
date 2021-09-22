import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountryService } from 'src/app/services/country.service';
import { ProduitService } from 'src/app/services/produits.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  //delivery
  lname: String;
  fname: String;
  cname: String;
  country: String;
  street_a: String;
  street_a_o: String;
  city: String;
  po: String;
  email: String;
  phone: String;
  note: String;

  delivery: any[] = [];


  paypalButton: Boolean = true;

  public payPalConfig?: IPayPalConfig;


  checkForm: FormGroup;


  cart: Array<string> = [];

  countries: any[];
  countriesSubscription: Subscription;


  @Input() totalHT: string;


  constructor(private produitService: ProduitService,
    private route: ActivatedRoute,
    private title: Title,
    private router: Router,
    private formBuiler: FormBuilder,
    private countryService: CountryService) { }


  ngOnInit() {

    this.country = 'Canada';

    this.storeCart();
    this.title.setTitle("TOONEUF - Caisse");

    this.calculatebill();
    this.storeCountry();
    this.checkFormulaire()
    this.initConfig();

    if (this.cart.length == 0) {
      this.paypalButton = false;
      this.router.navigate(['/cart']);

    }

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
    } else {
      this.cart = [];
    }
  }

  storeCountry() {

    this.countries = this.countryService.countries;
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


  checkFormulaire() {
    this.checkForm = this.formBuiler.group({
      lname: ['', Validators.required],
      fname: ['', Validators.required],
      cname: [''],
      country: ['Canada', Validators.required],
      street_a: ['', Validators.required],
      street_a_o: [''],
      city: ['', Validators.required],
      po: [''],
      email: ['', Validators.required],

      phone: ['', Validators.required],
      note: [''],
    })
  }

  onSubmitForm() {
    console.log(this.country);
  }

  private initConfig() {


    let montant = 0;
    for (let i = 0; i < this.cart.length; i++) {
      montant = montant + this.cart[i][0]['price'] * this.cart[i][0]['qty'];
    }
    this.totalHT = (Math.round(montant * 100) / 100).toFixed(2);



    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AQ6pV6seWrMLjFUfw4q-yzvZrhd4NEM_RT04w6ZFKtqKQ1e-myG7kMhKe_e1Nbdt0lAJHP3yHcEcMJ7M',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.totalHT,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.totalHT
                }
              }
            }
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        actions.order.get().then(details => {
          this.delivery = [
            {
              lname: this.lname,
              fname: this.fname,
              country: this.country,
              street_a: this.street_a,
              street_a_o: this.street_a_o,
              city: this.city,
              po: this.po,
              email: this.email,
              phone: this.phone,
              note: this.note,

            }
          ];

          this.countryService.sendBill(details, this.cart, this.delivery);

          //console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        this.cart.splice(0, this.cart.length);
        this.totalHT = '';
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.router.navigate(['/cart']);

        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {

        console.log('onClick', data, actions);
        console.log(this.delivery);
      },
    };
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
