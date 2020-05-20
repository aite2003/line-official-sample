import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodAllPage } from './food-all';

@NgModule({
  declarations: [
    FoodAllPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodAllPage),
  ],
})
export class FoodAllPageModule {}
