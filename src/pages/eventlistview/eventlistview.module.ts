import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventlistviewPage } from './eventlistview';

@NgModule({
  declarations: [
    EventlistviewPage,
  ],
  imports: [
    IonicPageModule.forChild(EventlistviewPage),
  ],
  exports: [
    EventlistviewPage
  ]
})
export class EventlistviewPageModule {}
