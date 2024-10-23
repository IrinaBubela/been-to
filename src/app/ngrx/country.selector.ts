import { createSelector } from '@ngrx/store';
import { CountryState } from './country.reducer';

export const selectCountryState = (state: any) => {
  return state?.countries;
};

export const selectAllCountries = createSelector(
  selectCountryState,
  (state: CountryState) => state?.countries,
);