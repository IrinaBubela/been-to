// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { select, Store } from '@ngrx/store';
// import { selectAllCountries } from '../../ngrx/country.selector';

// @Injectable({
//     providedIn: 'root'
// })
// export class MapService {
//     public countries$: Observable<string[]>;
//     public countries: string[];

//     constructor(private store: Store) {
//         this.countries$ = this.store.pipe(select(selectAllCountries));
//     }

//     getCountries(): Observable<string[]> {
//         return this.countries$;
//     }

//     getTotalCountriesSelected(): Observable<number> {
//         this.countries$ = this.store.select(CountrySelectors.selectAllCountries); 

//         this.countries$.subscribe(countries => {
//           return countries.length;
//         });
//     }
// }
