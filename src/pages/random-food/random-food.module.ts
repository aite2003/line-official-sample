import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RandomFoodPage } from './random-food';

@NgModule({
  declarations: [
    RandomFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(RandomFoodPage),
  ],
})
export class RandomFoodPageModule {}
