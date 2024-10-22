import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CountryActions from './country.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CountryService } from './country.service';

@Injectable()
export class CountryEffects {
  constructor(private actions$: Actions, private countryService: CountryService) { }

  addCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.addCountry),
      mergeMap(action =>
        this.countryService.addCountry(action.country).pipe(
          map(country => CountryActions.addCountrySuccess({ country })),
          catchError(error => of(CountryActions.addCountryFailure({ error })))
        )
      )
    )
  );

  fetchCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.fetchCountries),
      mergeMap(() =>
        this.countryService.getCountries().pipe(
          map(countries => {
            console.log('Fetched countries:', countries); // Debug log
            return CountryActions.fetchCountriesSuccess(countries);
          }),
          catchError(error => {
            console.error('Error fetching countries:', error);
            return of(CountryActions.fetchCountriesFailure({ error }));
          })
        )
      )
    )
  );
}
