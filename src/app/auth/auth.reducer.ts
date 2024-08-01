// // auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addCountry, removeCountry } from './auth.actions';
// import * as AuthActions from './auth.actions';
// 
// export interface AuthState {
//   user: any;
//   error: any;
//   visitedCountries: string[];
// }

// export const initialState: AuthState = {
//   user: '',
//   error: '',
//   visitedCountries: []
// };

// export const authReducer = createReducer(
//   initialState,
//   on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user })),
//   on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
//   on(AuthActions.registerSuccess, (state, { user }) => ({ ...state, user })),
//   on(AuthActions.registerFailure, (state, { error }) => ({ ...state, error })),
//   on(AuthActions.fetchVisitedCountriesSuccess, (state, { countries }) => ({ ...state, visitedCountries: countries })),
//   on(AuthActions.fetchVisitedCountriesFailure, (state, { error }) => ({ ...state, error })),
//   on(AuthActions.addVisitedCountrySuccess, (state, { country }) => ({
//     ...state,
//     visitedCountries: [...state.visitedCountries, country]
//   })),
//   on(AuthActions.addVisitedCountryFailure, (state, { error }) => ({ ...state, error }))
// );


// src/app/store/reducers/country.reducer.ts
// import { createReducer, on } from '@ngrx/store';
// import { addCountry, removeCountry } from '../actions/country.actions';


export const initialState: string[] = [];

const _countryReducer = createReducer(
  initialState,
  on(addCountry, (state, { country }) => [...state, country]),
  on(removeCountry, (state, { country }) => state.filter(c => c !== country))
);

export function countryReducer(state: any, action: any) {
  return _countryReducer(state, action);
}
