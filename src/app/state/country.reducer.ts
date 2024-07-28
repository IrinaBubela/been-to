// country.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialCountriesState } from './countries.state';
import { addCountry } from './countries.actions';

export const countriesReducer = createReducer(
  initialCountriesState,
  on(addCountry, (state, { country }) => {
    console.log('State before update:', state);
    const updatedCountries = [...state.countries, country];
    console.log('State after update:', { ...state, countries: updatedCountries });
    return { ...state, countries: updatedCountries };
  })
);
