import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class CountryListComponent implements OnInit {
  public countries$: Observable<string[]>;
  public countries: string[];

  constructor(private mapService: MapService,
    private cdRef: ChangeDetectorRef
  ) {
  }


  ngOnInit() {
    this.mapService.getCountries().subscribe(
      data => {
        this.countries = data;
        this.cdRef.detectChanges();
      }
    )
  }
}
