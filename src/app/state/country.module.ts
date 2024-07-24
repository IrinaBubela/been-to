import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './country.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('map', reducer)
  ],
})
export class MapModule {}
