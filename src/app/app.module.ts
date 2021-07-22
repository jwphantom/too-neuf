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
    Footer2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
