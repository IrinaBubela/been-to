import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MapComponent } from './components/map/map.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { Observable } from 'rxjs';
import { MapService } from './services/map/map.service';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, MapComponent, CountryListComponent, RouterOutlet, RouterLinkActive]
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public totalCountOfCountries: number;
  public countries$: Observable<string[]> = new Observable<string[]>;

  constructor(
    private readonly authService: AuthService,
    private readonly mapService: MapService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly renderer: Renderer2
  ) {
  }
  public ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;

    const googleMapsScriptElement = this.renderer.selectRootElement('#googleMapsScript', true);
    this.renderer.appendChild(googleMapsScriptElement, script);

    this.mapService.getTotalCountriesSelected()
      .subscribe(totalNum => {
        this.totalCountOfCountries = totalNum
        this.cdRef.detectChanges();
      });
  }

  public logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
