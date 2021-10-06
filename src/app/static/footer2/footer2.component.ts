import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer2',
  templateUrl: './footer2.component.html',
  styleUrls: ['./footer2.component.scss']
})
export class Footer2Component implements OnInit {

  email: String;


  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  submitNews(){
    console.log(this.email);

    let email = {'email': this.email}

    this.http
      .post('https://server-too-neuf.herokuapp.com/api/newsletter', email)
      .subscribe(
        (res) => {
          $('#popup-newsletter-success').show();

          setTimeout(function () {
            $('#popup-newsletter-success').hide();
          }, 3000);


        },
        (error) => {
          $('#popup-newsletter-info').show();

          setTimeout(function () {
            $('#popup-newsletter-info').hide();
          }, 3000);
          console.log('Erreur ! : ' + error);
        }
      );



  }

}
