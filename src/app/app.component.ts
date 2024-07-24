import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MapComponent } from './components/map/map.component';
import { CountrySelectorComponent } from './components/country-selector/country-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, CountrySelectorComponent, MapComponent]
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    this.authService.isLoggedIn()
      .subscribe((res) => { this.isLoggedIn = res });
  }

  public logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
