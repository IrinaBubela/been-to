// country-selector.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MapActions from '../../state/country.actions';
import { AppState, Country } from '../../state/country.model';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  standalone: true,
  imports: [CommonModule, NgFor],
})
export class CountrySelectorComponent {
  public countries: Country[] = [];

  constructor(private store: Store<AppState>) {
    this.store.select(state => state?.countryState?.countries).subscribe(countries => {
      this.countries = countries;
      console.log(this.countries, 'this.countries');

    });
  }

  public toggleVisited(countryId: string, isChecked: boolean) {
    if (isChecked) {
      this.store.dispatch(MapActions.markCountryAsVisited({ countryId }));
    } else {
      this.store.dispatch(MapActions.markCountryAsNotVisited({ countryId }));
    }
  }
}
