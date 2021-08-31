import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './static/header/header.component';
import { MenuComponent } from './static/menu/menu.component';
import { FooterComponent } from './static/footer/footer.component';
import { MiniCartComponent } from './static/mini-cart/mini-cart.component';
import { ScrollToTopComponent } from './static/scroll-to-top/scroll-to-top.component';
import { ShopComponent } from './pages/shop/shop.component';
import { Header2Component } from './static/header2/header2.component';
import { Footer2Component } from './static/footer2/footer2.component';
import { ProductComponent } from './pages/product/product.component';
import { ProduitService } from './services/produits.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './pages/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 

import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    MiniCartComponent,
    ScrollToTopComponent,
    ShopComponent,
    Header2Component,
    Footer2Component,
    ProductComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule


  ],
  providers: [
    ProduitService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
