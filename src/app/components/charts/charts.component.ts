import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  NgxApexchartsModule
} from 'ngx-apexcharts';
import * as CountrySelectors from '../../ngrx/country.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CountryState } from '../../ngrx/country.reducer';

const TOTAL_COUNTRIES = 195;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxApexchartsModule]
})
export class ChartsComponent implements OnInit {
  public chartSeries: ApexNonAxisChartSeries = [0, 145]; // Visited and remaining countries
  public chartLabels = ['Remaining Countries', 'Visited Countries'];
  public totalCountOfCountries: number;
  public remainingCountries: number;

  public chartColors: string[] = ['#EAC452', '#798086'];

  public chartOptions: ApexChart = {
    type: 'pie',
    height: 350
  };

  public chartResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ];

  // Configure the chart legend appearance
  public chartLegend: ApexLegend = {
    position: 'top',
    horizontalAlign: 'center',
    floating: false,
    fontSize: '14px',
    markers: {
      strokeWidth: 30,
      fillColors: ['#61666b', '#EAC452'],
      offsetY: 0
    },
    offsetY: 10
  };

  public countries$: Observable<string[]>;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly store: Store<{ countryState: CountryState }>
  ) { }

  ngOnInit(): void {
    this.countries$ = this.store.select(CountrySelectors.selectAllCountries);

    this.countries$.subscribe(countries => {
      this.totalCountOfCountries = countries.length;
      this.defineVisitedCountries();
      this.cdRef.detectChanges();
    });
  }

  public defineVisitedCountries(): void {
    this.remainingCountries = TOTAL_COUNTRIES - this.totalCountOfCountries;

    console.log('Total Countries:', this.totalCountOfCountries);
    console.log('Remaining Countries:', this.remainingCountries);

    // Ensure these are valid numbers before assigning
    if (this.totalCountOfCountries >= 0 && this.remainingCountries >= 0) {
      this.chartSeries = [this.totalCountOfCountries, this.remainingCountries];
    } else {
      console.error('Invalid country counts:', this.totalCountOfCountries, this.remainingCountries);
    }

    this.cdRef.detectChanges();
  }
}
