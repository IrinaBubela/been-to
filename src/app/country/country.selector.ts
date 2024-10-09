import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectCountriesState = createFeatureSelector<string[]>('countries');

export const selectAllCountries = createSelector(
  selectCountriesState,
  (countries) => countries
);
