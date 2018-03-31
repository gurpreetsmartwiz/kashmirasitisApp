import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { NotificationlistPage } from './notificationlist';


@NgModule({
  declarations: [
    NotificationlistPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationlistPage),
  ],
  exports: [
    NotificationlistPage
  ],
    schemas: [
    CUSTOM_ELEMENTS_SCHEMA
 ]
})
export class NotificationlistPageModule {}
