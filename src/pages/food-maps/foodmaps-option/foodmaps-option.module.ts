import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodmapsOptionPage } from './foodmaps-option';

@NgModule({
  declarations: [
    FoodmapsOptionPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodmapsOptionPage),
  ],
})
export class FoodmapsOptionPageModule {}
