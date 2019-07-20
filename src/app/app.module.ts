import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { ItemDropdownComponent } from './item-dropdown/item-dropdown.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SportsComponent } from './sports/sports.component';
import { AdminComponent } from './admin/admin.component';
import { ClothingComponent } from './clothing/clothing.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { AuthInterceptor } from './login/auth-interceptor';
import { AboutUsComponent } from './about-us/about-us.component';
import { PaymentComponent } from './payment/payment.component';
import { SecurityComponent } from './security/security.component';
import { ReturnComponent } from './return/return.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    ItemDropdownComponent,
    CarouselComponent,
    FooterComponent,
    DashboardComponent,
    ElectronicsComponent,
    SportsComponent,
    AdminComponent,
    ClothingComponent,
    ProductCardComponent,
    ProductDescriptionComponent,
    AboutUsComponent,
    PaymentComponent,
    SecurityComponent,
    ReturnComponent,
    TermsComponent,
    PrivacyComponent,
    CartComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
