// country.actions.ts
import { createAction, props } from '@ngrx/store';

export const addCountry = createAction(
    '[Country List] Add Country',
    props<{ country: string }>()
);