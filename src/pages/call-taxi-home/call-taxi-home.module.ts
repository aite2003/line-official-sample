import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallTaxiHomePage } from './call-taxi-home';

@NgModule({
  declarations: [
    CallTaxiHomePage,
  ],
  imports: [
    IonicPageModule.forChild(CallTaxiHomePage),
  ],
})
export class CallTaxiHomePageModule {}
