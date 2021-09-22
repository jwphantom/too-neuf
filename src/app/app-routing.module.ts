import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CheckoutComponent } from './pages/checkout/checkout.component'
import { ShopComponent } from './pages/shop/shop.component';
import { SupportComponent } from './pages/support/support.component';
import { MentionsComponent } from './pages/mentions/mentions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { GeneralConditionsComponent } from './pages/general-conditions/general-conditions.component';
import { RefundComponent } from './pages/refund/refund.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path : 'create-own/:id', component: ProductComponent},
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'support', component: SupportComponent },
  { path: 'legal-notices', component: MentionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'general-conditions', component: GeneralConditionsComponent },
  { path: 'refund', component: RefundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
