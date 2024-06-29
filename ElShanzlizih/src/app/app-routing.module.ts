import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { SpacificProductComponent } from './spacific-product/spacific-product.component';

const routes: Routes = [
  { path: "", redirectTo: "account", pathMatch: "full" },
  { path: "home", canActivate:[AuthGuard] ,component: HomeComponent },
  { path: "about", canActivate:[AuthGuard] ,component: AboutComponent },
  { path: "products", canActivate:[AuthGuard] ,component: ProductsComponent },
  { path: "contact_us", canActivate:[AuthGuard] , component: ContactUsComponent },
  {path:'cart' , canActivate:[AuthGuard] ,component:CartComponent},
  {path:"product/:id" , canActivate:[AuthGuard] , component:SpacificProductComponent},
  {
    path: 'account', component: AuthComponent, children: [
      {path:'' , redirectTo:'login' , pathMatch:'full'},
      { path: 'login', component: LoginComponent },
      {path:'signup' , component:RegisterComponent}
    ]
  },

  {path:"**" , component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
