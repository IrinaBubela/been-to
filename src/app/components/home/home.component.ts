import { Component } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { TotalComponent } from '../total/total.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigationBarComponent, TotalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
