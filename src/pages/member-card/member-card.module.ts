import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberCardPage } from './member-card';

@NgModule({
  declarations: [
    MemberCardPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberCardPage),
  ],
})
export class MemberCardPageModule {}
