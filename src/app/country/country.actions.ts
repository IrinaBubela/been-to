import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const register = createAction('[Auth] Register', props<{ username: string; password: string }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: any }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: any }>());

export const fetchVisitedCountries = createAction('[Country] Fetch Visited Countries');
export const fetchVisitedCountriesSuccess = createAction('[Country] Fetch Visited Countries Success', props<{ countries: string[] }>());
export const fetchVisitedCountriesFailure = createAction('[Country] Fetch Visited Countries Failure', props<{ error: any }>());

export const addVisitedCountry = createAction('[Country] Add Visited Country', props<{ country: any }>());
export const addVisitedCountrySuccess = createAction('[Country] Add Visited Country Success', props<{ country: any }>());
export const addVisitedCountryFailure = createAction('[Country] Add Visited Country Failure', props<{ error: any }>());

export const addCountry = createAction(
  '[Country] Add Country',
  props<{ country: string }>()
);

export const removeCountry = createAction(
  '[Country] Remove Country',
  props<{ country: string }>()
);

export const addCountrySuccess = createAction(
  '[Country] Add Country Success',
  props<{ country: string }>() // You can modify this to include more data if needed
);

export const addCountryFailure = createAction(
  '[Country] Add Country Failure',
  props<{ error: any }>()
);

