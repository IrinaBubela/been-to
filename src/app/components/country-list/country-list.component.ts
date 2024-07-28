// app/components/country-list/country-list.component.ts
import { Component, OnInit } from '@angular/core';
// import { select, Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { Country } from '../../state/countries.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class CountryListComponent implements OnInit {
  // public countries$: Observable<Country[]> = new Observable<Country[]>;

  // constructor(private store: Store<{ countries: Country[] }>) {
  //   this.countries$ = this.store.pipe(select('countries'));
  //   this.countries$.subscribe(data => console.log('data', data));
  // }

  ngOnInit() {
    // this.countries$.subscribe(countries => {
    //   console.log('Countries:', countries);
    // });
  }
}
