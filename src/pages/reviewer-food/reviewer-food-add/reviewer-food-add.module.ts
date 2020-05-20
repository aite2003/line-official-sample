import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewerFoodAddPage } from './reviewer-food-add';

@NgModule({
  declarations: [
    ReviewerFoodAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewerFoodAddPage),
  ],
})
export class ReviewerFoodAddPageModule {}
