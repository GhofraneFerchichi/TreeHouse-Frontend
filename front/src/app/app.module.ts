import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule here
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './front/home/home.component';
import { SafePipe } from './safe.pipe';
import { CoursePipe } from './course.pipe';
import { UserListComponent } from './admin/user-list/user-list.component';
import { AuthComponent } from './auth/auth.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ResetPasswordComponents } from './auth/forget-password/forget-password.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { RenthomeComponent } from './front/renthome/renthome.component';
import { NavbarRentComponent } from './front/navbar-rent/navbar-rent.component';
import { NavbarFournitureComponent } from './navbar-fourniture/navbar-fourniture.component';
import { FournituresShopComponent } from './fournitures-shop/fournitures-shop.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductService } from "./services/product.service";
import { ViewcartComponent } from './viewcart/viewcart.component';
import { CommandeComponent } from './commande/commande.component';
import { ListCommandComponent } from './list-command/list-command.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursePipe,
    UserListComponent,
    AuthComponent,
    ResetPasswordComponent,
    ResetPasswordComponents,
    FournituresShopComponent,
    SafePipe,
    SignUpComponent,
    UserListComponent,
    AuthComponent,
    ResetPasswordComponent,
    SignUpComponent,
    RenthomeComponent,
    NavbarRentComponent,
    NavbarFournitureComponent,
    FournituresShopComponent,
    AddProductComponent,
    UpdateProductComponent,
    ViewcartComponent,
    CommandeComponent,
    ListCommandComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NgxPaginationModule,
    RouterModule.forRoot([]),
  ],
  providers: [ProductService,  {provide: LocationStrategy, useClass: HashLocationStrategy}

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
