import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {

  }

  public ngOnInit(): void {
    this.authService.isLoggedIn()
      .subscribe((res) => { this.isLoggedIn = res });
  }

  public logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}