// app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MapComponent } from './components/map/map.component';

import { AuthService } from './services/auth/auth.service';
import { CountryService } from './services/countries.service';
import { ProductComponent } from './product/product.component';
import { countriesReducer } from './state/country.reducer';

// const routes: Routes = [
//   { path: '', component: MapComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ countryState: countriesReducer })
  ],
  providers: [AuthService, CountryService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
