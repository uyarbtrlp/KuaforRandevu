import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component'
import { NgxElectronModule } from 'ngx-electron';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './home/customers/customers.component';
import { SummaryComponent } from './home/summary/summary.component';
import { ConfirmDialogComponent } from './home/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CustomersComponent,
    SummaryComponent,
    ConfirmDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxElectronModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    FontAwesomeModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ShowHidePasswordModule,
    MatSidenavModule


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
