import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodMapsPage } from './food-maps';

@NgModule({
  declarations: [
    FoodMapsPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodMapsPage),
  ],
})
export class FoodMapsPageModule {}
