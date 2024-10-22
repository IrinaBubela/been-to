import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MapComponent } from './components/map/map.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { Observable } from 'rxjs';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import { CountryState } from './ngrx/country.reducer';
import { selectAllCountries } from './ngrx/country.selector';

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
    private readonly authService: AuthService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly renderer: Renderer2
  ) {
  }
  public ngOnInit(): void {
    // this.countries$ = this.store.select(selectAllCountries); 

    // this.countries$.subscribe(countries => {
    //   this.totalCountOfCountries = countries.length;
    //   this.cdRef.detectChanges();
    // });

    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;

    const googleMapsScriptElement = this.renderer.selectRootElement('#googleMapsScript', true);
    this.renderer.appendChild(googleMapsScriptElement, script);
  }

  public logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
