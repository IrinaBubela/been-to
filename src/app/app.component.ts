import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MapComponent } from './components/map/map.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { Store } from '@ngrx/store';
import { CountryState } from './state/countries.state';
import { Observable } from 'rxjs';
import { addCountry } from './state/countries.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, MapComponent, CountryListComponent]
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public countries$: Observable<string[]> = new Observable<string[]>;

  constructor(
    private store: Store<{ countryState: CountryState }>,
    private authService: AuthService
  ) {
    this.countries$ = this.store.select(state => state.countryState.countries);
  }
  public ngOnInit(): void {
    this.authService.isLoggedIn()
      .subscribe((res) => { this.isLoggedIn = res });

    this.addCountry('Canada');
  }

  public addCountry(country: string): void {
    console.log('addCountry', country);
    
    this.store.dispatch(addCountry({ country }));
  }

  public logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
