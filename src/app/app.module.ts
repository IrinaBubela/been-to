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
import { countryReducer } from './auth/auth.reducer';
import { CountryEffects } from './auth/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MapComponent,
    CountryListComponent,
  ],
  imports: [
    CommonModule,
    AppComponent,
    LoginComponent,
    SignupComponent,
    MapComponent,
    CountryListComponent,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ countries: countryReducer }),
    EffectsModule.forRoot([CountryEffects]),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
