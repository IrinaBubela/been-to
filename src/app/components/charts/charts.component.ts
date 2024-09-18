import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  NgxApexchartsModule
} from 'ngx-apexcharts';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxApexchartsModule]
})
export class ChartsComponent implements OnInit {
  public chartSeries: ApexNonAxisChartSeries = [50, 145]; // Visited and remaining countries
  public chartLabels = ['Remaining Countries', 'Visited Countries'];

  public chartColors: string[] = ['#EAC452', '#000000'];

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
      fillColors: ['#000000', '#EAC452'], 
      offsetY: 0
    },
    offsetY: 10
  };

  constructor() {}

  ngOnInit(): void {}
}
