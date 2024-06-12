import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { SingleProductComponent } from './front/shop/single-product/single-product.component';

import { UserListComponent } from './admin/user-list/user-list.component';
import { AuthComponent } from './auth/auth.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ResetPasswordComponents } from './auth/forget-password/forget-password.component';




import {UpdateProductComponent} from "./admin/update-product/update-product.component";
import {RenthomeComponent} from "./front/renthome/renthome.component";
import {FournituresShopComponent} from "./fournitures-shop/fournitures-shop.component";
import {AddProductComponent} from "./add-product/add-product.component";
import { ViewcartComponent } from './viewcart/viewcart.component';
import { CommandeComponent } from './commande/commande.component';
import { ListCommandComponent } from './list-command/list-command.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';




const routes: Routes = [
//General empty page and its children FRONT
{path: '', component: FournituresShopComponent},
  {path: 'home', component: FournituresShopComponent},
  {path:'shop', component: FournituresShopComponent},
  {path:'renthome', component: RenthomeComponent},
  {path:'shopf', component: FournituresShopComponent},
  {path:'addproduct', component: AddProductComponent},
  { path: 'listUser', component: UserListComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'forget', component: ResetPasswordComponent },
  {path: 'signup', component: SignUpComponent},
   {path: 'reset',component: ResetPasswordComponents},
  { path: 'auth', component: AuthComponent },  
  { path: 'Forget', component: ResetPasswordComponent },
  { path: 'sign', component: SignUpComponent },
  { path: 'cart', component: ViewcartComponent },
  { path: 'commande', component: CommandeComponent },
  { path: 'list', component: ListCommandComponent },

//user
{ path: 'listUser', component: UserListComponent },
{ path: 'updateProduct/:id', component: UpdateProductComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:true}), BrowserModule,FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
