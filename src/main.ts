import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { countryReducer } from './app/country/country.reducer';
import { CountryEffects } from './app/country/country.effects';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    CommonModule,
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      StoreModule.forRoot({ countries: countryReducer }),
      EffectsModule.forRoot([CountryEffects])
    ),
  ],
})
  .catch((err) => console.error(err));
