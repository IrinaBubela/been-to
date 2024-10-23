import { createReducer, on } from '@ngrx/store';
import * as CountryActions from './country.actions';

export interface CountryState {
  countries: string[];
  error?: string;
}

const initialState: CountryState = {
  countries: [],
  error: undefined
};

export const countryReducer = createReducer(
  initialState,
  on(CountryActions.fetchCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries: [...new Set([...state.countries, ...countries])] // Prevent duplicates on fetch
  })),

  on(CountryActions.addCountry, (state, { country }) => {
    // Check if the country is already in the list to avoid duplicates
    if (state.countries.includes(country)) {
      return state;
    }
    return {
      ...state,
      countries: [...state.countries, country]
    };
  }),

  on(CountryActions.removeCountry, (state, { country }) => ({
    ...state,
    countries: state.countries.filter(c => c !== country)
  })),

  on(CountryActions.fetchCountriesFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(CountryActions.logout, (state) => ({
    ...state,
    countries: [],
    error: undefined
  })),

  on(CountryActions.resetCountries, (state) => ({
    ...state,
    countries: [] // Reset countries to an empty array (on logout e.g.)
  }))
);
