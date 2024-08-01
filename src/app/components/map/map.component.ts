import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import * as AuthActions from '../../auth/auth.actions';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private highlightedCountries: Set<string> = new Set();

  constructor(private store: Store<{ countries: string[] }>) {
  }

  ngOnInit() {
    this.initMap();
  }

  public initMap() {
    const map = this.initializeMap();
    this.initializeMapFunctionality(map);
  }

  public initializeMapFunctionality(map: any): void {
    map.data.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');

    map.data.setStyle({
      fillColor: '#888888',
      strokeWeight: 1
    });

    map.data.addListener('click', (event: any) => {
      const countryName = event.feature.getProperty('name');

      if (this.highlightedCountries.has(countryName)) {
        // If the clicked country was already selected, remove the highlight
        this.removeHighlight(map, countryName);
        this.highlightedCountries.delete(countryName);
        this.store.dispatch(AuthActions.removeCountry({ country: countryName }));
      } else {
        // Highlight the new country
        this.highlightCountry(map, countryName, 'red');
        this.highlightedCountries.add(countryName);
        this.store.dispatch(AuthActions.addCountry({ country: countryName }));
      }

      console.log('Highlighted countries:', Array.from(this.highlightedCountries));
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

  public initializeMap(): any {
    return new google.maps.Map(document.getElementById('map'), {
      center: { lat: 20, lng: 0 },
      zoom: 2
    });
  }
}
