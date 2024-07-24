// src/app/components/country/country.component.ts
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CountryState } from '../../state/country.model';

@Component({
  selector: 'app-selected-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {
  public selectedCountry$: Observable<{ name: string; login: string; password: string; } | null>;

  constructor(private store: Store<{ country: CountryState }>) {
    this.selectedCountry$ = store.pipe(select('country', 'selectedCountry'));
  }
}
