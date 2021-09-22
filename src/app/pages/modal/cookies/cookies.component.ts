import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.verifyCookie();

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

  agree() {
    localStorage.setItem('cookie', 'true');
  }

  verifyCookie() {

    let cookie = localStorage.getItem('cookie');
    if (cookie != 'true') {
      this.loadScript('../assets/js/cookieModal.js');

      $(document).ready(function () {
        ($('#cookieModal') as any).modal('show');
      });
    }
  }




}
