import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CountryActions from '../../ngrx/country.actions';
import { CountryState } from '../../ngrx/country.reducer';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class CountryListComponent implements OnInit {
  public countries$: Observable<any[]>;
  public error$: Observable<string | null>;

  constructor(private store: Store<{ countryState: CountryState }>) { }


  ngOnInit() {
    this.store.dispatch(CountryActions.fetchCountries());
    this.countries$ = this.store.select(state => {
      return state.countryState.countries;
    });
    this.error$ = this.store.select(state => state.countryState.error);
  }
}
