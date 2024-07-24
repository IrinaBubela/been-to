import { createAction, props } from '@ngrx/store';

export const markCountryAsVisited = createAction(
  '[Map] Mark Country As Visited',
  props<{ countryId: string }>()
);

export const markCountryAsNotVisited = createAction(
  '[Map] Mark Country As Not Visited',
  props<{ countryId: string }>()
);