import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventpopoverPage } from './eventpopover';

@NgModule({
  declarations: [
    EventpopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(EventpopoverPage),
  ],
  exports: [
    EventpopoverPage
  ]
})
export class EventpopoverPageModule {}
