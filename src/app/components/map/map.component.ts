import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
// import { addCountry } from '../../state/countries.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  countries$: Observable<string[]>;
  
  constructor(private store: Store<{ countries: string[] }>) {
    this.countries$ = store.select('countries');
  }
  
  ngOnInit() {
    this.initMap();
  }

  public initMap() {
    const map = this.initializeMap();

    map.data.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');

    map.data.setStyle({
      fillColor: '#888888',
      strokeWeight: 1
    });

    map.data.addListener('click', (event: any) => {
      const countryName = event.feature.getProperty('name');
      map.data.overrideStyle(event.feature, { fillColor: 'red' });
      console.log('Visited: ' + countryName);
      const country = countryName;
      // this.store.dispatch(addCountry());

    });
  }

  public initializeMap(): any {
    // Your map initialization logic here
    // For example, initialize Google Maps
    return new google.maps.Map(document.getElementById('map'), {
      center: { lat: 20, lng: 0 },
      zoom: 2
    });
  }
}
