import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root',
})

export class UploadFileService {
    private baseUrl = 'https://server-too-neuf.herokuapp.com/api';



    constructor(private http: HttpClient,
        private toastr: ToastrService) { }

    async saveImage(image) {

        const options = { positionClass:'toast-custom' };

        const formData = new FormData();

        formData.append('image', image);

        this.http
            .post(this.baseUrl+'/upload', formData)
            .subscribe(
                (res) => {

                    //this.toastr.success('success', 'Importation Complète');

                    localStorage.setItem('url_img', JSON.stringify(res));
                    
                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );

    }

    async uploadImage(url) {

        let link = {uri : 'images/test.png'}

        this.http
            .post(this.baseUrl+'/ert', link)
            .subscribe(
                () => {

                    console.log("ok");
                    // localStorage.setItem('image-name', JSON.stringify(this.cart));


                },
                (error) => {
                    console.log('Erreur ! : ' + error);
                }
            );

    }
}