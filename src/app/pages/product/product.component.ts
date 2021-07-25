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
  min_price: String;
  max_price: String;
  short_name : String;
  variantes: any[];
  size: String;
  color: String;



  cookiCart: any[];
  type: String;

  produit: any[];

  cart: Array<string> = [];

  constructor(private produitService: ProduitService,
    private route: ActivatedRoute,
    private title: Title) { }

  ngOnInit() {

    this.size = "S"
    this.color = "Blanc"


    const id = this.route.snapshot.params['id'];

    this.name = this.produitService.getProduitById(+id).name;
    this.min_price = this.produitService.getProduitById(+id).min_price;
    this.max_price = this.produitService.getProduitById(+id).max_price;
    this.short_name = this.produitService.getProduitById(+id).short_name;
    this.variantes = this.produitService.getProduitById(+id).variantes;



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
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  changeSize(size : String){

    this.size = size;

  }

  changeColor(color : String){

    this.color = color;

  }
  
}
