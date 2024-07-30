// src/app/store/selectors/country.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';

// Define the feature selector for the countries state
export const selectCountriesState = createFeatureSelector<string[]>('countries');

// Selector to get the list of countries
export const selectAllCountries = createSelector(
  selectCountriesState,
  (countries) => countries
);
