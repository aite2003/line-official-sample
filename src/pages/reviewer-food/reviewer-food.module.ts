import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewerFoodPage } from './reviewer-food';

@NgModule({
  declarations: [
    ReviewerFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewerFoodPage),
  ],
})
export class ReviewerFoodPageModule {}
