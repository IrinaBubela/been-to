import { createAction, props } from '@ngrx/store';

export const selectCountry = createAction(
  '[Country] Select Country',
  props<{ name: string; login: string; password: string }>()
);