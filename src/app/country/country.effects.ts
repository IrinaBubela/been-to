import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './country.actions'; 
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './country.service';

@Injectable()
export class CountryEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  addCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.addCountry), // Listen for the addCountry action
      mergeMap(action =>
        this.authService.addCountry(action.country).pipe(
          map(country => AuthActions.addCountrySuccess({ country })), // Dispatch success action
          catchError(error => of(AuthActions.addCountryFailure({ error }))) // Dispatch failure action
        )
      )
    )
  );
}
