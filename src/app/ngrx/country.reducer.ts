import { createReducer, on, Action } from '@ngrx/store';
import * as CountryActions from './country.actions';

export interface CountryState {
  countries: string[];
  error: string | null;
}

export const initialState: CountryState = {
  countries: [],
  error: null,
};

const _countryReducer = createReducer(
  initialState,

  on(CountryActions.fetchCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries: Array.isArray(countries) ? [...countries] : [],
    error: null,
  })),

  on(CountryActions.fetchCountriesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(CountryActions.addCountry, (state, { country }) => {
    if (state.countries.includes(country)) {
      return state;
    }
    return {
      ...state,
      countries: [...state.countries, country],
    };
  }),

  on(CountryActions.removeCountry, (state, { country }) => ({
    ...state,
    countries: state.countries.filter(c => c !== country),
  })),

  on(CountryActions.addCountrySuccess, (state, { country }) => ({
    ...state,
    countries: [...state.countries, country],
  })),

  on(CountryActions.addCountryFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function countryReducer(state: CountryState | undefined, action: Action) {
  return _countryReducer(state, action);
}
