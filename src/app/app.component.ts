import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MapComponent } from './components/map/map.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { Observable } from 'rxjs';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CountryState } from './ngrx/country.reducer';
import * as CountryActions from './ngrx/country.actions';
import * as CountrySelectors from './ngrx/country.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, MapComponent, CountryListComponent,
    RouterOutlet, RouterLinkActive]
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public totalCountOfCountries: number;
  public countries$: Observable<string[]> = new Observable<string[]>;

  constructor(
    private readonly store: Store<{ countryState: CountryState }>,
  ) {
    this.store.dispatch(CountryActions.fetchCountries());

    // Select the countries from the store
    this.countries$ = this.store.pipe(select(CountrySelectors.selectAllCountries));

    this.countries$.subscribe(countries => {
      this.totalCountOfCountries = countries.length;
    });
  }
  public ngOnInit(): void { }
}
