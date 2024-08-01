import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule ,RouterLinkActive]
})
export class NavigationBarComponent {

}
