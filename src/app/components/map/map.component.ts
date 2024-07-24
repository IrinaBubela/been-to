import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CountryState } from '../../state/country.model';
import * as CountryActions from '../../state/country.actions'; 

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private store: Store<{ country: CountryState }>) {}

  ngOnInit() {
    this.initMap();
  }

  public initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 20, lng: 0 },
      zoom: 2
    });

    map.data.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');

    map.data.setStyle({
      fillColor: '#888888',
      strokeWeight: 1
    });

    map.data.addListener('click', (event) => {
      const countryName = event.feature.getProperty('name');
      map.data.overrideStyle(event.feature, { fillColor: 'red' });
      console.log('Visited: ' + countryName);
      
      // Dispatch the action to select the country
      this.store.dispatch(CountryActions.selectCountry({ name: countryName, login: '', password: '' }));
    });
  }
}
