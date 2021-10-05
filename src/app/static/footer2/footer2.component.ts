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
      .post('http://localhost:3001/api/newsletter', email)
      .subscribe(
        (res) => {
          $('#popup-newsletter').show();

          setTimeout(function () {
            $('#popup-newsletter').hide();
          }, 3000);


        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );



  }

}
