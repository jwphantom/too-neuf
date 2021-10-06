import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

   private baseUrl = 'https://server-too-neuf.herokuapp.com/api';
   //private baseUrl = 'http://localhost:3001/api';


  contactForm: FormGroup;

  load: Boolean = false;

  cart: Array<string> = [];

  constructor(private title: Title,
    private formBuiler: FormBuilder,
    private contactService: ContactService,
    private http: HttpClient) { }

  ngOnInit() {

    this.title.setTitle("TOO NEUF - Contact");


    this.storeCart();


    this.contactFormulaire();

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
    this.loadScript('../assets/js/gmap.js');


  }

  contactFormulaire() {
    this.contactForm = this.formBuiler.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      objet: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  onSubmitForm() {
    const formValue = this.contactForm.value;

    this.load = true;

    this.http
      .post(this.baseUrl + '/send_message', formValue)
      .subscribe(
        (res) => {
          $('#popup-message-sent').show();

          setTimeout(function () {
            $('#popup-message-sent').hide();
          }, 3000);

          $(':input', '#contact-form')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .prop('checked', false)
            .prop('selected', false);

            this.load = false;
            this.contactFormulaire();

        },
        (error) => {
          console.log('Erreur ! : ' + error);
          $('#popup-message-fail').show();

          setTimeout(function () {
            $('#popup-message-fail').hide();
          }, 3000);
          this.load = false;

        }
      );

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

  showToast() {

    $('#snackbar').show();

    setTimeout(function () {
      $('#snackbar').hide();
    }, 3000);


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
