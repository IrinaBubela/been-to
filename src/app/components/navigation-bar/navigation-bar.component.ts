import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MapService } from '../../services/map/map.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, RouterLinkActive, CommonModule]
})
export class NavigationBarComponent implements OnInit {
  public totalCountOfCountries: number;
  public countries$: Observable<string[]> = new Observable<string[]>;
  public maxCountries: number = 200;
  public currentUser: string;
  private authSubscription: Subscription;

  constructor(
    private readonly mapService: MapService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      console.log('currentUser', this.currentUser);
      this.currentUser = user;
    });


    this.mapService.getTotalCountriesSelected()
      .subscribe(totalNum => {
        this.totalCountOfCountries = totalNum;
        this.cdRef.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}