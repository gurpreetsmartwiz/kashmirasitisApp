import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObituaryPage } from './obituary';


@NgModule({
  declarations: [
    ObituaryPage,
  ],
  imports: [
    IonicPageModule.forChild(ObituaryPage),
  ],
  exports: [
    ObituaryPage
  ]
})
export class ObituaryPagePageModule {}
