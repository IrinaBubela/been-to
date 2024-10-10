import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CountryState } from './country.reducer';

export const selectCountryState = (state: { countryState: CountryState }) => state.countryState;

// Selector for all countries
export const selectAllCountries = createSelector(
  selectCountryState,
  (state: CountryState) => state.countries
);
