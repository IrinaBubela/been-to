import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import * as AuthActions from '../../auth/auth.actions';
import { mapOptions } from '../../map-options';
import { Observable } from 'rxjs';
import { MapService } from '../../services/map/map.service';

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
  public countries$: Observable<string[]> = new Observable<string[]>;

  constructor(
    private readonly store: Store<{ countries: string[] }>,
    private readonly mapService: MapService,
    private readonly cdRef: ChangeDetectorRef,
  ) {
  }


  ngOnInit() {
    this.initMap();
    this.getSelectedState();
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
      // this.map.data.revertStyle();
      // this.map.data.overrideStyle(event.feature, { fillColor: '#FF0000' });

      const countryName = event.feature.getProperty('name');
      if (countryName === 'Antarctica') {
        return;
      }
      if (this.highlightedCountries.has(countryName)) {
        // If the clicked country was already selected, remove the highlight
        this.removeHighlight(map, countryName);
        this.highlightedCountries.delete(countryName);
        this.store.dispatch(AuthActions.removeCountry({ country: countryName }));
      } else {
        // Highlight the new country
        console.log('countryName', countryName);

        this.highlightCountry(map, countryName, '#EAC452');
        this.highlightedCountries.add(countryName);
        this.store.dispatch(AuthActions.addCountry({ country: countryName }));
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
