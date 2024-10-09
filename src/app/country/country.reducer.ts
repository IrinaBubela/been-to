import { createReducer, on, Action } from '@ngrx/store';
import { addCountry, removeCountry } from './country.actions';

export const initialState: string[] = [];

const _countryReducer = createReducer(
  initialState,
  on(addCountry, (state, { country }) => {
    console.log(state, 'state');
    console.log(country, 'country');
    
    // Check if the country already exists to avoid duplicates
    if (state.includes(country)) {
      console.log(state.includes(country), 'state.includes(country)');
      
      return state; // Return the current state if the country already exists
    }
    console.log([...state, country], 'RETURN');
    
    return [...state, country]; // Add the new country
  }),
  on(removeCountry, (state, { country }) => 
    state.filter(c => c !== country) // Filter out the removed country
  )
);

export function countryReducer(state: string[] | undefined, action: Action) {
  return _countryReducer(state, action);
}
