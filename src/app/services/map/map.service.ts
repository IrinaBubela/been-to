import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { selectAllCountries } from '../../country/country.selector';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    public countries$: Observable<string[]>;
    public countries: string[];

    constructor(private store: Store) {
        this.countries$ = this.store.pipe(select(selectAllCountries));
    }

    getCountries(): Observable<string[]> {
        return this.countries$;
    }

    getTotalCountriesSelected(): Observable<number> {
        return this.countries$.pipe(map(data => data.length));
    }
}
