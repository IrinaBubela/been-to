import { createReducer, on } from '@ngrx/store';
import * as MapActions from './country.actions';
import { Country } from './country.model';

const initialState: Country[] = [
    { id: '1', visited: false },
    { id: '2', visited: false },
];

const mapReducer = createReducer(
    initialState,
    on(MapActions.markCountryAsVisited, (state, { countryId }) => {
        return state.map(country =>
            country.id === countryId ? { ...country, visited: true } : country
        );
    }),
    on(MapActions.markCountryAsNotVisited, (state, { countryId }) => {
        return state.map(country =>
            country.id === countryId ? { ...country, visited: false } : country
        );
    })
);

export function reducer(state: any, action: any) {
    return mapReducer(state, action);
}
