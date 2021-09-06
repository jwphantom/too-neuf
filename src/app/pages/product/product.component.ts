import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produits.service';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelectProductComponent } from '../modal/select-product/select-product.component';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { Observable } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { CdkDragEnd } from '@angular/cdk/drag-drop/drag-events';


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  selectedFile: ImageSnippet;


  name: String;
  price: String;
  min_price: String;
  max_price: String;
  short_name: String;
  variantes: any[];
  size_p: any[];

  size: String;
  color: String;
  is_size: Boolean;

  src_i_p: String;

  src_i_m: String;

  w_p_info: Boolean = true;
  zoneText: Boolean = false;

  t_perso: any[] = [];
  id_t_perso: number;

  t_color: String = 'black';

  t_weight: any[] = [];
  t_c_weight: Boolean = false;

  t_style: Boolean = false;
  t_c_style: Boolean = false;

  t_deco: Boolean = false;
  t_c_deco: Boolean = false;

  t_family: String = 'Verdana';

  is_p: Boolean = false;


  @Input() size_t: number = 10;
  @Input() size_i: number = 80;


  active_t_p: Boolean = false;
  active_i_p: Boolean = true;

  modal_import: Boolean = false;
  m_change_family: Boolean = false;

  family = ['Times New Roman', 'Impact', 'Verdana', 'Trebuchet', 'Gill Sans', 'Courier New', 'Lucida Sans', 'Cambria', 'Cochin', 'Georgia']


  cookiCart: any[];
  type: String;

  produit: any[];

  cart: Array<string> = [];

  @Input() qty: number = 1;


  imgFile: string;

  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    imgSrc: new FormControl('', [Validators.required])
  });

  constructor(private produitService: ProduitService,
    private route: ActivatedRoute,
    private title: Title,
    private http: HttpClient,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private uploadService: UploadFileService) { }

  ngOnInit() {

    this.storeCart();

    this.color = "white";


    this.store_product();


    this.update_produit();

    this.title.setTitle("TOONEUF - Produits -" + this.name);


    this.loadScript('../assets/js/move.js');
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

  store_product() {
    const id = this.route.snapshot.params['id'];

    this.name = this.produitService.getProduitById(+id).name;
    this.src_i_p = this.produitService.getProduitById(+id).src_index;
    this.size_p = this.produitService.getProduitById(+id).size;

    this.price = this.produitService.getProduitById(+id).price;
    this.short_name = this.produitService.getProduitById(+id).short_name;
    this.variantes = this.produitService.getProduitById(+id).variantes;
    this.is_size = this.produitService.getProduitById(+id).is_size;

    this.size = this.size_p[0];

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


  inc_qty(qte) {

    let q = parseFloat(qte);

    if (this.qty > 0) {
      this.qty = q + 1;
      this.produit[0]['qty'] = this.qty;

    }
    else {
      this.qty = 1;
      this.produit[0]['qty'] = this.qty;

    }

  }


  dec_qty(qte) {

    let q = parseFloat(qte);

    if (this.qty == 1) {

      this.qty = 1;
      this.produit[0]['qty'] = this.qty;


    }
    else {
      this.qty = q - 1;
      this.produit[0]['qty'] = this.qty;

    }
  }

  change_qty(qte) {

    this.qty = parseFloat(qte);

  }

  changeSize(size: String) {

    this.size = size;
    this.update_produit();

  }

  changeColor(color: String) {
    this.color = color;
    this.src_i_p = this.short_name + "-" + color;
    this.update_produit();

  }

  change_t_Color(color: string) {
    //getted from event
    //getted from binding
  }

  change_t_w(param: Boolean, i) {

    this.t_perso[i][0].bold = param;
    this.t_c_weight = !this.t_c_weight;
    this.update_produit();


  }

  change_t_s(param: Boolean, i) {

    this.t_perso[i][0].italic = param;
    this.t_c_style = !this.t_c_style;
    this.update_produit();

  }

  change_t_d(param: Boolean, i) {

    this.t_perso[i][0].underline = param;
    this.t_c_deco = !this.t_c_deco;
    this.update_produit();

  }


  change_t_f(font: String) {

    this.t_family = font;
    this.update_produit();

  }

  perso_is_open(param: boolean) {
    this.is_p = param;
    this.update_produit();

  }

  storeCart() {

    let cartLocal = localStorage.getItem('cart');
    if (cartLocal) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    } else {
      this.cart = [];

    }
  }

  addCart(produit) {

    this.storeCart();


    let iCart;
    let index;
    let eCart;

    if (this.cart.length <= 0) {
      //produit[0]['qty'] = 1;
      this.cart.push(produit);
      localStorage.setItem('cart', JSON.stringify(this.cart));

    } else {

      this.cart.push(produit);
      localStorage.setItem('cart', JSON.stringify(this.cart));


      // for (let i = 0; i < this.cart.length; i++) {

      //   if (this.cart[i][0]['id'] == produit[0]['id']) {
      //     if (this.cart[i][0]['color'] == produit[0]['color'] && this.cart[i][0]['size'] == produit[0]['size']) {
      //       iCart = i + 1;
      //       index = i;
      //     }
      //     else {
      //       eCart = 0;

      //     }

      //   }
      //   else {

      //     // produit[0]['qty'] = 1;
      //     // this.cart.push(produit);
      //     // this.cookieService.set('cart', JSON.stringify(this.cart))
      //     // break;
      //     eCart = 0;
      //   }

      // }

      // if (iCart > 0) {
      //   this.cart[index][0]['qty'] = this.cart[index][0]['qty'] + 1;
      //   localStorage.setItem('cart', JSON.stringify(this.cart));

      // }
      // if (eCart == 0) {
      //   //produit[0]['qty'] = this.qty;
      //   this.cart.push(produit);
      //   localStorage.setItem('cart', JSON.stringify(this.cart));

      // }



    }


  }

  update_produit() {

    const id = this.route.snapshot.params['id'];

    if (this.is_size) {
      this.produit = [
        {
          id: id,
          name: this.name,
          short_name: this.short_name,
          price: this.price,
          qty: this.qty,
          text: this.t_perso,
          src_img: this.src_i_m,
          color: this.color,
          size: this.size,

        }
      ];

    }
    else {
      this.produit = [
        {
          id: id,
          name: this.name,
          short_name: this.short_name,
          price: this.price,
          qty: this.qty,
          text: this.t_perso,
          src_img: this.src_i_m

        }
      ];

    }


  }

  add_zone_text() {

    this.zoneText = true;
    this.w_p_info = false;
    this.active_t_p = true;
    this.modal_import = false;
    this.m_change_family = false;


    let l = this.t_perso.length;

    if (l == 0) {
      this.id_t_perso = 0;
      this.t_perso[0] = [
        {
          variantes: [


          ],
          bold: false,
          italic: false,
          underline: false,
          color: 'black',
          size: 10,
          family: 'Times New Roman',
          word: 'Votre Texte' + (l + 1),
        }
      ]
    } else {

      this.id_t_perso = l;
      let param = [
        {
          variantes: [

          ],
          bold: false,
          italic: false,
          underline: false,
          color: 'black',
          family: 'Times New Roman',
          size: 10,
          word: 'Votre Texte' + (l + 1),

        }
      ];

      this.t_perso.push(param);


    }


    this.update_produit();


  }

  dragEnd(event: CdkDragEnd) {
    this.t_perso[this.id_t_perso][0].variantes = event.distance;
  }

  edit_text(i) {

    this.zoneText = true;
    this.w_p_info = false;
    this.active_t_p = true;
    this.modal_import = false;
    this.m_change_family = false;
    this.id_t_perso = i;

    this.update_produit();
  }

  delete_text(id) {

    if (id == 0) {
      this.t_perso.splice(id, 1);
      this.close_text_p();
    }
    else {
      this.t_perso.splice(id, 1);
      this.edit_text(id - 1)

    }
    this.update_produit();

  }


  write_t_p(ev) {

    try {
      this.t_perso = ev.target.value;

    } catch (e) {
      console.info('could not set textarea-value');
    }
  }


  get uf() {
    return this.uploadForm.controls;
  }

  onImageChange(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.uploadForm.patchValue({
          imgSrc: reader.result
        });

      };
    }
  }



  inc_size_text(size) {

    let s = parseFloat(size);
    // console.log(this.qty); 

    if (this.t_perso[this.id_t_perso][0].size > 0) {

      if (this.t_perso[this.id_t_perso][0].size >= 32) {
        this.t_perso[this.id_t_perso][0].size = s;
      }
      else {
        this.t_perso[this.id_t_perso][0].size = s + 1;

      }

      //this.produit[0]['qty'] = this.qty;

    }
    else {
      this.t_perso[this.id_t_perso][0].size = 1;
      //this.produit[0]['qty'] = this.qty;

    }

  }


  dec_size_text(size) {


    let s = parseFloat(size);

    if (this.t_perso[this.id_t_perso][0].size == 1) {

      this.t_perso[this.id_t_perso][0].size = 1;
      //this.produit[0]['qty'] = this.qty;


    }
    else {
      this.t_perso[this.id_t_perso][0].size = s - 1;
      //this.produit[0]['qty'] = this.qty;
    }
  }

  change_size_text(size) {

    this.t_perso[this.id_t_perso][0].size = parseFloat(size);

  }

  close_text_p() {
    this.zoneText = false;
    this.w_p_info = true;
    this.modal_import = false;
    this.m_change_family = false;


  }

  modal_i() {
    this.zoneText = false;
    this.w_p_info = false;
    this.modal_import = true;
    this.active_i_p = true;
    this.m_change_family = false;

  }

  close_modal_i() {
    this.zoneText = false;
    this.w_p_info = true;
    this.modal_import = false;
    this.m_change_family = false;

  }



  inc_size_image(size) {

    let s = parseFloat(size);

    if (this.size_i > 0) {


      this.size_i = s + 1;

      //this.produit[0]['qty'] = this.qty;

    }
    else {
      this.size_i = 1;
      //this.produit[0]['qty'] = this.qty;

    }

  }


  dec_size_image(size) {

    let s = parseFloat(size);

    if (this.size_i == 1) {

      this.size_i = 1;
      //this.produit[0]['qty'] = this.qty;


    }
    else {
      this.size_i = s - 1;
      //this.produit[0]['qty'] = this.qty;
    }
  }

  change_size_image(size) {

    this.size_i = parseFloat(size);

  }

  getPosition(event, i) {

    var text = '.text_perso_' + i;

    var p = $(text);
    var offset = p.offset();
    console.log("x: " + offset.left + ", y: " + offset.top);
    //p.html("left: " + offset.left + ", top: " + offset.top);

  }



  modal_change_family() {
    this.zoneText = false;
    this.w_p_info = false;
    this.modal_import = false
    this.m_change_family = true;

  }

  c_modal_change_family() {
    this.zoneText = true;
    this.w_p_info = false;
    this.modal_import = false
    this.m_change_family = false;

  }

  change_family(f) {
    this.t_perso[this.id_t_perso][0].family = f;
    this.m_change_family = false;
    this.zoneText = true;
    this.w_p_info = false;
    this.modal_import = false
    this.m_change_family = false;


  }


  openDialog() {
    const dialogRef = this.dialog.open(SelectProductComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.store_product();
      console.log(`Dialog result: ${result}`);
    });
  }

  // uploadImage(){
  //   this.uploadService.import("e");
  // }

  uploadImage() {
    this.uploadService.uploadImage("url");
  }

  async processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      const formData = new FormData();

      formData.append('image', this.selectedFile.file);

      this.http
        .post('https://server-too-neuf.herokuapp.com/api/upload', formData)
        .subscribe(
          async (res) => {

            //this.toastr.success('success', 'Importation Complète');

            localStorage.setItem('url_img', JSON.stringify(res));
            const test = await this.display_img()

          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );



      //this.uploadService.saveImage(this.selectedFile.file);


    });

    reader.readAsDataURL(file);

  }

  display_img() {
    $('.file-upload-content').show();

    let url = localStorage.getItem('url_img');
    if (url) {
      this.src_i_m = JSON.parse(localStorage.getItem('url_img')).url;
    }

  }

  removeUpload() {
    $(".image-upload-input").val(null);
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
    $('.file-upload-btn').show();
    $('.file-upload-input').show();



  }





}