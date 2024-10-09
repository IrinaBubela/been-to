import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MapComponent } from './components/map/map.component';
import { AuthService } from './services/auth/auth.service';
import { CountryListComponent } from './components/country-list/country-list.component';
import { StoreModule } from '@ngrx/store';
import { countryReducer } from './country/country.reducer';
import { CountryEffects } from './country/country.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxApexchartsModule } from 'ngx-apexcharts';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppComponent,
    LoginComponent,
    SignupComponent,
    MapComponent,
    CountryListComponent,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ countries: countryReducer }),
    EffectsModule.forRoot([CountryEffects]),
    NgxApexchartsModule,
  ],
  providers: [AuthService],
  bootstrap: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
