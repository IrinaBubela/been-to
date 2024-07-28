// app/store/countries/countries.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CountryService } from '../services/countries.service';

@Injectable()
export class CountriesEffects {
    constructor(
        private actions$: Actions,
        private countryService: CountryService
    ) {}

     // Example: Load selected countries from an API
     public loadSelectedCountries$ = createEffect(() =>
        this.actions$.pipe(
            ofType('[Countries Page] Load Selected Countries'),
            mergeMap(() =>
                this.countryService.getSelectedCountries().pipe(
                    map((selectedCountries: string[]) => ({
                        type: '[Countries API] Load Selected Countries Success',
                        selectedCountries
                    })),
                    catchError(() => of({ type: '[Countries API] Load Selected Countries Error' }))
                )
            )
        )
    );
}