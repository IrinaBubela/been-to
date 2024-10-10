import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CountryActions from './country.actions'; 
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './country.service';

@Injectable()
export class CountryEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  addCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.addCountry), 
      mergeMap(action =>
        this.authService.addCountry(action.country).pipe(
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
        this.authService.getCountries().pipe( 
          map(countries => CountryActions.fetchCountriesSuccess({ countries })), 
          catchError(error => of(CountryActions.fetchCountriesFailure({ error })))
        )
      )
    )
  );
}
