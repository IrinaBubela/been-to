import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, Country } from '../../state/country.model';
import * as MapActions from '../../state/country.actions';
import { CommonModule } from '@angular/common';
import { Observable, of, switchMap, take } from 'rxjs';
import { createFeatureSelector } from '@ngrx/store';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public countries: Country[] = [];


  constructor(private store: Store<{ countryStore: Store<AppState> }>) {
    const dataSelector = createFeatureSelector('countryStore');

    this.store.select(dataSelector).subscribe(
      (data: any) => {
        console.log('data', data);
        this.countries = data;
      }
    );
  }

  ngOnInit() {
    this.initMap();
    const dataSelector = createFeatureSelector('countryStore');

    this.store.select(dataSelector).subscribe(
      (data: any) => {
        console.log('data', data);
        this.countries = data;
      }
    );
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

    map.data.addListener('click', (event: any) => {
      const countryName = event.feature.getProperty('name');
      map.data.overrideStyle(event.feature, { fillColor: 'red' });
      console.log('Visited: ' + countryName);
      this.store.dispatch(MapActions.markCountryAsVisited({ countryId: countryName }));

      // this.store.pipe(select('countryStore'),
      //   take(1)
      //           switchMap((data) => {
      //     return this.dataService.postData(data);
      //   }
      //   ).subscribe(responseOfDataService => {
      //     //do whatever you want to do with the response
      //     console.log(responseOfDataService);
      //   });

      // console.log(this.countries);

      // Dispatch the action to select the country
    });
  }
}
