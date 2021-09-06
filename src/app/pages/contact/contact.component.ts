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
      email: ['', Validators.required, Validators.email],
      objet: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  onSubmitForm() {
    const formValue = this.contactForm.value;

    this.load = true;

    this.http
      .post('https://server-too-neuf.herokuapp.com/api/send-message', formValue)
      .subscribe(
        (res) => {
          $('#snackbar').show();

          setTimeout(function () {
            $('#snackbar').hide();
          }, 3000);

          $(':input', '#contact-form')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .prop('checked', false)
            .prop('selected', false);

            this.load = false;

        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );



    //this.contactService.sendEmail(formValue);

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

}
