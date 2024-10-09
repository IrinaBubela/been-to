import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import * as AuthActions from '../../country/country.actions';
import { mapOptions } from '../../map-options';
import { Observable } from 'rxjs';
import { MapService } from '../../services/map/map.service';
import { CountriesService } from '../../services/auth/countries.service';

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
  public selectedCountries: string[];

  constructor(
    private readonly store: Store<{ countries: string[] }>,
    private readonly mapService: MapService,
    private readonly countriesService: CountriesService,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadGoogleMapsScript().then(() => {
      this.initMap();
      this.getSelectedState();
    });

    this.countriesService.getCountries().subscribe(data => {
      this.selectedCountries = data;
    });
  }

  // Function to load Google Maps script dynamically
  private loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google && (window as any).google.maps) {
        resolve(); // If the script is already loaded
      } else {
        const script = document.createElement('script');
        // Use the API key from environment variables
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
      }
    });
  }

  public getSelectedState(): void {
    this.mapService.getTotalCountriesSelected()
      .subscribe(totalNum => {
        this.totalCountOfCountries = totalNum;
        this.cdRef.detectChanges();
      });
  }

  public initMap(): void {
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    map.data.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');

    this.addStyleForSelectingCountries(map);
    this.addFunctionalityToMap(map);
  }

  public addFunctionalityToMap(map: any): void {
    map.data.addListener('click', (event: any) => {
      const countryName = event.feature.getProperty('name');
      if (countryName === 'Antarctica') {
        return;
      }

      const countryCode = event.feature.Gg;
      if (this.highlightedCountries.has(countryName)) {
        this.removeHighlight(map, countryName);
        this.highlightedCountries.delete(countryName);
        this.store.dispatch(AuthActions.removeCountry({ country: countryName }));

        this.countriesService.removeCountry(countryCode)
          .subscribe(
            (data) => console.log(data, 'data'),
            (err) => console.log(err, 'err'),
          );
      } else {
        this.highlightCountry(map, countryName, '#EAC452');
        this.highlightedCountries.add(countryName);
        console.log({ country: countryName }, 'hereee');
        
        this.store.dispatch(AuthActions.addCountry({ country: countryName }));

        // this.countriesService.addCountry(countryCode)
        //   .subscribe(data => console.log(data, 'data'));
      }
    });
  }

  public addStyleForSelectingCountries(map: any): void {
    map.data.setStyle(() => {
      return {
        fillColor: '#eeeeee',
        strokeColor: '#3f4242',
        strokeWeight: 1,
      };
    });
  }

  public highlightCountry(map: any, countryName: string, color: string) {
    map.data.forEach((feature: any) => {
      if (feature.getProperty('name') === countryName) {
        map.data.overrideStyle(feature, { fillColor: color });
      }
    });
  }

  public removeHighlight(map: any, countryName: string) {
    map.data.forEach((feature: any) => {
      if (feature.getProperty('name') === countryName) {
        map.data.overrideStyle(feature, { fillColor: 'none' });
      }
    });
  }
}
