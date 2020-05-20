import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickOriginPage } from './pick-origin';

@NgModule({
  declarations: [
    PickOriginPage,
  ],
  imports: [
    IonicPageModule.forChild(PickOriginPage),
  ],
})
export class PickOriginPageModule {}
