import { createSelector } from '@ngrx/store';
import { CountryState } from './country.reducer';

export const selectCountryState = (state: { countryState: CountryState }) => state.countryState;

export const selectAllCountries = createSelector(
  selectCountryState,
  (state: CountryState) => state.countries
);