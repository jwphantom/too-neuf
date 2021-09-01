import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produits.service';
import * as $ from 'jquery';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  name: String;
  price: String;
  min_price: String;
  max_price: String;
  short_name: String;
  variantes: any[];
  size: String;
  color: String;
  is_size: Boolean;

  src_i_p: String;

  w_p_info: Boolean = true;
  zoneText: Boolean = false;

  t_perso: any[] = [];
  id_t_perso : number;

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

  family = ['Times New Roman', 'Impact','Verdana','Trebuchet','Gill Sans','Courier New','Lucida Sans','Cambria','Cochin','Georgia']


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
    private httpClient: HttpClient) { }

  ngOnInit() {

    this.storeCart();

    this.size = "S";
    this.color = "white";

    const id = this.route.snapshot.params['id'];

    this.name = this.produitService.getProduitById(+id).name;
    this.src_i_p = this.produitService.getProduitById(+id).src_index;

    this.price = this.produitService.getProduitById(+id).price;
    this.short_name = this.produitService.getProduitById(+id).short_name;
    this.variantes = this.produitService.getProduitById(+id).variantes;
    this.is_size = this.produitService.getProduitById(+id).is_size;



    this.update_produit();

    this.title.setTitle("TOONEUF - Produits -" + this.name);




    this.loadScript('../assets/js/move.js');
    this.loadScript('../assets/js/b_upload.js');


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
    // console.log(this.qty); 

    if (this.qty > 0) {
      this.qty = q + 1;
      console.log(this.qty);
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

      console.log(this.qty);
    }
  }

  change_qty(qte) {

    this.qty = parseFloat(qte);
    console.log(this.qty);

  }

  changeSize(size: String) {

    this.size = size;
    this.update_produit();

  }

  changeColor(color: String) {
    this.color = color;
    this.src_i_p = "tshirt-" + color;
    console.log(this.src_i_p);
    this.update_produit();

  }

  change_t_Color(color: string) {
    //getted from event
    //console.log(id);
    //getted from binding
  }

  change_t_w(param: Boolean,i) {

    this.t_perso[i][0].bold = param;
    this.t_c_weight = !this.t_c_weight;
    this.update_produit();


  }

  change_t_s(param: Boolean,i) {

    this.t_perso[i][0].italic = param;
    this.t_c_style = !this.t_c_style;
    this.update_produit();

  }

  change_t_d(param: Boolean,i) {

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

    console.log(produit);
    //console.log(this.qty);


    let iCart;
    let index;
    let eCart;

    if (this.cart.length <= 0) {
      //produit[0]['qty'] = 1;
      this.cart.push(produit);
      localStorage.setItem('cart', JSON.stringify(this.cart));

    } else {
      for (let i = 0; i < this.cart.length; i++) {

        if (this.cart[i][0]['id'] == produit[0]['id']) {
          if (this.cart[i][0]['color'] == produit[0]['color'] && this.cart[i][0]['size'] == produit[0]['size']) {
            iCart = i + 1;
            index = i;
          }
          else {
            eCart = 0;

          }

        }
        else {
          console.log(0);

          // produit[0]['qty'] = 1;
          // this.cart.push(produit);
          // console.log(this.cart);
          // this.cookieService.set('cart', JSON.stringify(this.cart))
          // break;
          eCart = 0;
        }

      }

      if (iCart > 0) {
        console.log("ic");
        this.cart[index][0]['qty'] = this.cart[index][0]['qty'] + 1;
        localStorage.setItem('cart', JSON.stringify(this.cart));

      }
      if (eCart == 0) {
        //produit[0]['qty'] = this.qty;
        this.cart.push(produit);
        console.log("eC");
        localStorage.setItem('cart', JSON.stringify(this.cart));

      }



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
          size: this.size,
          color: this.color,
          t_perso: this.t_perso,
          t_weight: this.t_weight,
          t_style: this.t_style,


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
          size: 'NaN',
          color: this.color,
          var_image: this.short_name + '-' + this.color,
          t_perso: this.t_perso,
          t_weight: this.t_weight,
          t_style: this.t_style,


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

    if(l == 0){
      this.id_t_perso = 0;
      this.t_perso[0] = [
        {
          variantes: [
            {
              x: 0,
              y: 0,
            }
          ],
          bold : false,
          italic : false,
          underline : false,
          color : 'black',
          size : 10,
          family : 'Times New Roman',
          word : 'Votre Texte'+(l+1)
        }
      ]
    }else{
      console.log(l);

      this.id_t_perso = l;
      let param = [
        {
          variantes: [
            {
              x: 0,
              y: 0,
            }
          ],
          bold : false,
          italic : false,
          underline : false,
          color : 'black',
          family : 'Times New Roman',
          size : 10,
          word : 'Votre Texte'+(l+1)
        }
      ];

      this.t_perso.push(param);


    }

    console.log(this.t_perso);

  }

  edit_text(i){
    this.zoneText = true;
    this.w_p_info = false;
    this.active_t_p = true;
    this.modal_import = false;
    this.m_change_family = false;
    this.id_t_perso = i;
  }

  write_t_p(ev) {

    try {
      this.t_perso = ev.target.value;
      console.log(this.t_perso);

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

  upload() {
    console.log(this.uploadForm.value);
    this.httpClient.post('http://localhost:8888/file-upload.php', this.uploadForm.value)
      .subscribe(response => {
        alert('Image has been uploaded.');
      })
  }


  inc_size_text(size) {

    let s = parseFloat(size);
    // console.log(this.qty); 

    if (this.t_perso[this.id_t_perso][0].size > 0) {

      if (this.t_perso[this.id_t_perso][0].size >= 32) {
        this.t_perso[this.id_t_perso][0].size = s;
        console.log(this.size);
      }
      else {
        this.t_perso[this.id_t_perso][0].size = s + 1;
        console.log(this.size);

      }

      //this.produit[0]['qty'] = this.qty;

    }
    else {
      this.t_perso[this.id_t_perso][0].size = 1;
      //this.produit[0]['qty'] = this.qty;

    }

  }


  dec_size_text(size) {

    console.log(size);

    let s = parseFloat(size);

    if (this.t_perso[this.id_t_perso][0].size == 1) {

      this.t_perso[this.id_t_perso][0].size = 1;
      //this.produit[0]['qty'] = this.qty;


    }
    else {
      this.t_perso[this.id_t_perso][0].size = s - 1;
      //this.produit[0]['qty'] = this.qty;

      console.log(this.qty);
    }
  }

  change_size_text(size) {

    this.t_perso[this.id_t_perso][0].size = parseFloat(size);
    console.log(this.t_perso[this.id_t_perso][0].size);

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
    // console.log(this.qty); 

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

      console.log(this.qty);
    }
  }

  change_size_image(size) {

    this.size_i = parseFloat(size);

  }

  getPosition(event) {
    var p = $(".text_perso");
    var offset = p.offset();
    console.log("x: " + offset.left + ", y: " + offset.top);
    //p.html("left: " + offset.left + ", top: " + offset.top);

  }



  modal_change_family(){
    this.zoneText = false;
    this.w_p_info = false;
    this.modal_import = false
    this.m_change_family = true;

  }

  c_modal_change_family(){
    this.zoneText = true;
    this.w_p_info = false;
    this.modal_import = false
    this.m_change_family = false;

  }

  change_family(f){
    this.t_perso[this.id_t_perso][0].family = f;
    this.m_change_family = false;
    this.zoneText = true;
    this.w_p_info = false;
    this.modal_import = false
    this.m_change_family = false;


  }


}

