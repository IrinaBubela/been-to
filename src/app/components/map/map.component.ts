import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import * as CountryActions from '../../ngrx/country.actions';
import { mapOptions } from '../../map-options';
import { Observable } from 'rxjs';
import * as CountrySelectors from '../../ngrx/country.selector';
import { CountryState } from '../../ngrx/country.reducer';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private highlightedCountries: Set<string> = new Set();
  public totalCountOfCountries: number;
  public countries$: Observable<string[]> = new Observable<string[]>();
  public selectedCountries: string[] = [];
  private map: any;

  constructor(
    private readonly store: Store<{ countryState: CountryState }>,
    private readonly cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.loadGoogleMapsScript().then(() => {
      this.initMap();
    });

    this.store.dispatch(CountryActions.fetchCountries());

    this.countries$ = this.store.select(CountrySelectors.selectAllCountries);
    this.countries$.subscribe((countries) => {
      this.selectedCountries = countries;
      this.highlightedCountries = new Set(countries);
      this.cdRef.detectChanges();

      if (this.map) {
        this.highlightCountriesOnMap();
      }
    });
  }

  private loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google && (window as any).google.maps) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=geometry`; // Add geometry library
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
      }
    });
  }

  public initMap(): void {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, mapOptions);
      this.addFunctionalityToMap(this.map);
      this.map.data.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
      this.addStyleForSelectingCountries(this.map);
    }
  }

  public addFunctionalityToMap(map: any): void {
    map.data.addListener('click', (event: any) => {
      const countryName = event.feature.getProperty('name');
      if (countryName === 'Antarctica') {
        return;
      }

      if (!countryName) return;

      if (this.highlightedCountries.has(countryName)) {
        this.removeHighlight(map, countryName);
        this.highlightedCountries.delete(countryName);
        this.store.dispatch(CountryActions.removeCountry({ country: countryName }));
      } else {
        this.highlightCountry(map, countryName, '#EAC452');
        this.highlightedCountries.add(countryName);
        this.store.dispatch(CountryActions.addCountry({ country: countryName }));
      }
    });
  }

  public addStyleForSelectingCountries(map: any): void {
    map.data.setStyle((feature: any) => ({
      fillColor: this.highlightedCountries.has(feature.getProperty('name')) ? '#EAC452' : '#eeeeee',
      strokeColor: '#3f4242',
      strokeWeight: 1,
    }));
  }

  public highlightCountriesOnMap(): void {
    this.map.data.forEach((feature: any) => {
      if (this.highlightedCountries.has(feature.getProperty('name'))) {
        this.map.data.overrideStyle(feature, { fillColor: '#EAC452', strokeWeight: 1 });
      } else {
        this.map.data.overrideStyle(feature, { fillColor: '#eeeeee', strokeWeight: 1 });
      }
    });
  }

  public highlightCountry(map: any, countryName: string, color: string): void {
    map.data.forEach((feature: any) => {
      if (feature.getProperty('name') === countryName) { 
        map.data.overrideStyle(feature, { fillColor: color, strokeWeight: 1 });
      }
    });
  }

  public removeHighlight(map: any, countryName: string): void {
    map.data.forEach((feature: any) => {
      if (feature.getProperty('name') === countryName) {
        map.data.overrideStyle(feature, { fillColor: '#eeeeee', strokeWeight: 1 });
      }
    });
  }
}
