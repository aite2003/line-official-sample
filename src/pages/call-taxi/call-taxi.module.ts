import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallTaxiPage } from './call-taxi';

@NgModule({
  declarations: [
    CallTaxiPage,
  ],
  imports: [
    IonicPageModule.forChild(CallTaxiPage),
  ],
})
export class CallTaxiPageModule {}
