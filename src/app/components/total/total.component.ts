import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryState } from '../../ngrx/country.reducer';
import { Store } from '@ngrx/store';
import * as CountrySelectors from '../../ngrx/country.selector'

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [],
  templateUrl: './total.component.html',
  styleUrl: './total.component.scss'
})
export class TotalComponent implements OnInit {
  public totalCountOfCountries: number;
  public countries$: Observable<string[]>;
  public maxCountries: number = 200;

  constructor(
    private readonly store: Store<{ countryState: CountryState }>, 
    private readonly cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.countries$ = this.store.select(CountrySelectors.selectAllCountries); 

    this.countries$.subscribe(countries => {
      this.totalCountOfCountries = countries.length;
      this.cdRef.detectChanges();
    });
  }

  get visitedPercentage(): number {
    return (this.totalCountOfCountries / this.maxCountries) * 100;
  }

  get planningPercentage(): number {
    return (this.totalCountOfCountries / this.maxCountries) * 100;
  }
}
