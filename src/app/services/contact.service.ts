import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root',
})

export class ContactService {

    private baseUrl = 'http://localhost:3001/api';


    constructor(private http: HttpClient,
        private toastr: ToastrService) { }

    async sendEmail(content) {

        this.http
            .post(this.baseUrl + '/send-message', content)
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

                    $('.contact-form-wrap-1').hide();
                    $('.contact-form-wrap').show();




                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );



    }

}