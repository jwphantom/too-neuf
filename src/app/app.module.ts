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
import { UploadFileService } from './services/upload-file.service';
import { ContactService } from './services/contact.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './pages/cart/cart.component';
import { HttpClientModule } from '@angular/common/http'; 
import {MatDialogModule} from '@angular/material/dialog';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { SelectProductComponent } from './pages/modal/select-product/select-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';
import { ContactComponent } from './pages/contact/contact.component';


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
    CartComponent,
    SelectProductComponent,
    ContactComponent,
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    FileUploadModule

  ],
  providers: [
    ProduitService,
    UploadFileService,
    ContactService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
