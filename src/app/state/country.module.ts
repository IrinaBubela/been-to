import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { countryReducer } from './country.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('country', countryReducer)
  ]
})
export class CountryModule {}
