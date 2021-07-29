import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produits.service';

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

  t_perso: string = 'Bonjour';

  t_color: String = 'black';

  t_weight: Boolean = false;
  t_c_weight: Boolean = false;

  t_style: Boolean = false;
  t_c_style: Boolean = false;

  t_deco: Boolean = false;
  t_c_deco: Boolean = false;


  t_family : String  = 'Impact';

  is_p: Boolean = false;


  cookiCart: any[];
  type: String;

  produit: any[];

  cart: Array<string> = [];

  qty: number;

  constructor(private produitService: ProduitService,
    private route: ActivatedRoute,
    private title: Title) { }

  ngOnInit() {

    this.storeCart();


    this.size = "S"
    this.color = "white"


    const id = this.route.snapshot.params['id'];

    this.name = this.produitService.getProduitById(+id).name;
    this.price = this.produitService.getProduitById(+id).price;
    this.short_name = this.produitService.getProduitById(+id).short_name;
    this.variantes = this.produitService.getProduitById(+id).variantes;
    this.is_size = this.produitService.getProduitById(+id).is_size;



    this.update_produit();

    this.title.setTitle("TOONEUF - Produits -" + this.name);


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


  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  changeSize(size: String) {

    this.size = size;
    this.update_produit();

  }

  changeColor(color: String) {
    this.color = color;
    this.update_produit();

  }

  change_t_Color(color: string) {
    //getted from event
    //console.log(id);
    //getted from binding
  }

  change_t_w(param: Boolean) {

    this.t_weight = param;
    this.t_c_weight = !this.t_c_weight;
    this.update_produit();


  }

  change_t_s(param: Boolean) {

    this.t_style = param;
    this.t_c_style = !this.t_c_style;
    this.update_produit();

  }

  change_t_d(param: Boolean) {

    this.t_deco = param;
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

  storeCart(){
    console.log('yo');

    let cartLocal = localStorage.getItem('cart');
    if (cartLocal) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      console.log(this.cart);
    } else {
      this.cart = [];
      console.log(this.cart);

    }
  }

  addCart(produit) {

    this.storeCart();

    //console.log(this.qty);


    let iCart;
    let index;
    let eCart;

    if (this.cart.length <= 0) {
      produit[0]['qty'] = 1;
      this.cart.push(produit);
      console.log(this.cart);
      localStorage.setItem('cart', JSON.stringify(this.cart));

    } else {
      for (let i = 0; i < this.cart.length; i++) {

        if (this.cart[i][0]['id'] == produit[0]['id']) {
          if (this.cart[i][0]['color'] == produit[0]['color'] && this.cart[i][0]['size'] == produit[0]['size']) {
            iCart = i + 1;
            index = i;
          }
          else{
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
        console.log(this.cart);


      }
      if (eCart == 0) {
        produit[0]['qty'] = 1;
        this.cart.push(produit);
        console.log("eC");
        localStorage.setItem('cart', JSON.stringify(this.cart));
        console.log(this.cart);

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
          size: 'NaN',
          color: this.color,
          var_image : this.short_name+'-'+this.color,
          t_perso: this.t_perso,
          t_weight: this.t_weight,
          t_style: this.t_style,


        }
      ];

    }


  }

}
