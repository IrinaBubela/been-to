import { createAction, props } from '@ngrx/store';

export const fetchCountries = createAction('[Country] Fetch Countries');
export const fetchCountriesSuccess = createAction(
  '[Country] Fetch Countries Success',
  props<{ countries: string[] }>()
);
export const fetchCountriesFailure = createAction('[Country] Fetch Countries Failure', props<{ error: any }>());

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
  props<{ country: string }>()
);

export const addCountryFailure = createAction(
  '[Country] Add Country Failure',
  props<{ error: any }>()
);

