import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginGuard } from './guards/login.guard';
import { PaymentComponent } from './payment/payment.component';
import { SecurityComponent } from './security/security.component';
import { ReturnComponent } from './return/return.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


const routes: Routes = [
  {path: '', component: NavBarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard/:name', component: DashboardComponent,canActivate:[LoginGuard]},
  {path: 'admin', component:AdminComponent,canActivate:[LoginGuard]},
  {path: 'productDescription/:productID', component:ProductDescriptionComponent,canActivate:[LoginGuard]},
  {path: 'aboutUs', component:AboutUsComponent,canActivate:[LoginGuard]},
  {path: 'payment', component:PaymentComponent},
  {path: 'security', component:SecurityComponent},
  {path: 'return', component:ReturnComponent},
  {path: 'terms', component:TermsComponent},
  {path: 'privacy', component:PrivacyComponent},
  {path: 'cart', component:CartComponent},
  {path:'contact',component:ContactUsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[LoginGuard]
})
export class AppRoutingModule { }
