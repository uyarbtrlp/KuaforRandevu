import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './auth/auth.guard'
import {SummaryComponent} from './home/summary/summary.component'
import {CustomersComponent} from './home/customers/customers.component'



const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:"home",redirectTo:"home/customers",pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {
    path:'home',component:HomeComponent,canActivate:[AuthGuard],children:[
      {path:'customers',component:CustomersComponent}
      ,{path:'summary',component:SummaryComponent}
    ]
      
    
  },
  
 
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
