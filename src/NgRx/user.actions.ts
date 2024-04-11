import { createAction, props } from '@ngrx/store';

export const login = createAction('[User] Login', props<{ username: string; password: string }>());
export const logout = createAction('[User] Logout');
export const register = createAction('[User] Register', props<{ username: string; password: string }>());
export const markVisitedCountry = createAction('[User] Mark Visited Country', props<{ userId: string; countryName: string }>());
