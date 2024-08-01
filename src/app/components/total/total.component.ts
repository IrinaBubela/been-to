import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [],
  templateUrl: './total.component.html',
  styleUrl: './total.component.scss'
})
export class TotalComponent implements OnInit {
  public totalCountOfCountries: number;
  public countries$: Observable<string[]> = new Observable<string[]>;

  constructor(
    private readonly mapService: MapService,
    private readonly cdRef: ChangeDetectorRef,
  ) {

  }

  public ngOnInit(): void {
    this.mapService.getTotalCountriesSelected()
      .subscribe(totalNum => {
        this.totalCountOfCountries = totalNum;
        console.log(this.totalCountOfCountries, 'this.totalCountOfCountries');
        
        this.cdRef.detectChanges();
      });
  }
}
