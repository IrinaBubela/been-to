// // auth.effects.ts
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import * as AuthActions from './auth.actions';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { AuthService } from '../services/auth/auth.service';

// @Injectable()
// export class AuthEffects {
//   constructor(private actions$: Actions, private authService: AuthService) {}

//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.login),
//       mergeMap(action =>
//         this.authService.login(action.username, action.password).pipe(
//           map(user => AuthActions.loginSuccess({ user })),
//           catchError(error => of(AuthActions.loginFailure({ error })))
//         )
//       )
//     )
//   );

//   register$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.register),
//       mergeMap(action =>
//         this.authService.register(action.username, action.password).pipe(
//           map(user => AuthActions.registerSuccess({ user })),
//           catchError(error => of(AuthActions.registerFailure({ error })))
//         )
//       )
//     )
//   );

//   fetchVisitedCountries$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.fetchVisitedCountries),
//       mergeMap(() =>
//         this.authService.getVisitedCountries().pipe(
//           map((countries: string[]) => AuthActions.fetchVisitedCountriesSuccess({ countries })),
//           catchError(error => of(AuthActions.fetchVisitedCountriesFailure({ error })))
//         )
//       )
//     )
//   );

//   addVisitedCountry$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.addVisitedCountry),
//       mergeMap(action =>
//         this.authService.addCountry(action.country).pipe(
//           map(country => AuthActions.addVisitedCountrySuccess({ country })),
//           catchError(error => of(AuthActions.addVisitedCountryFailure({ error })))
//         )
//       )
//     )
//   );
// }


// src/app/store/effects/country.effects.ts
// src/app/store/effects/country.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { addCountry, removeCountry } from './auth.actions';

@Injectable()
export class CountryEffects {
  addCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCountry),
      tap(action => {
        console.log('Country added:', action.country);
      })
    ),
    { dispatch: false }
  );

  removeCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCountry),
      tap(action => {
        console.log('Country removed:', action.country);
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}

