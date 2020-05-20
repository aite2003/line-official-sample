import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewerFoodReadPage } from './reviewer-food-read';

@NgModule({
  declarations: [
    ReviewerFoodReadPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewerFoodReadPage),
  ],
})
export class ReviewerFoodReadPageModule {}
