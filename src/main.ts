import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { countryReducer } from './app/auth/auth.reducer';
import { CountryEffects } from './app/auth/auth.effects';
import { CommonModule } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    CommonModule,
    importProvidersFrom(
      HttpClientModule,
      //NgRx modules
      StoreModule.forRoot({ countries: countryReducer }),
      EffectsModule.forRoot([CountryEffects])
    ),
  ],
})
  .catch((err) => console.error(err));
