import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  NgxApexchartsModule
} from 'ngx-apexcharts';
import { MapService } from '../../services/map/map.service';

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

  constructor(
    private readonly mapService: MapService,
    private readonly cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getVisitedCountries();
  }

  public getVisitedCountries(): void {
    this.mapService.getTotalCountriesSelected()
      .subscribe(totalNum => {
        this.totalCountOfCountries = totalNum;
        this.remainingCountries = TOTAL_COUNTRIES - this.totalCountOfCountries;
        this.chartSeries = [this.totalCountOfCountries, this.remainingCountries]
        this.cdRef.detectChanges();
      });
  }
}
