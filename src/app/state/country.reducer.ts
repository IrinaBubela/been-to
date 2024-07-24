import { createReducer, on } from '@ngrx/store';
import * as CountryActions from './country.actions';
import { CountryState } from './country.model';

const initialState: CountryState = {
  selectedCountry: null
};

export const countryReducer = createReducer(
  initialState,
  on(CountryActions.selectCountry, (state, { name, login, password }) => ({
    ...state,
    selectedCountry: { name, login, password }
  }))
);
