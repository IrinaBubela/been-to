import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as CountrySelectors from '../../ngrx/country.selector';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CountryState } from '../../ngrx/country.reducer';

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
    private readonly store: Store<{ countryState: CountryState }>,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.countries$ = this.store.select(CountrySelectors.selectAllCountries);

    this.countries$.subscribe(countries => {
      console.log('countries', countries);
      
      this.totalCountOfCountries = countries.length;
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