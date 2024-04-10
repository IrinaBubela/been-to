import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    CommonModule,
    MainPageComponent,
    NavigationBarComponent,
  ]
})
export class AppModule { }
