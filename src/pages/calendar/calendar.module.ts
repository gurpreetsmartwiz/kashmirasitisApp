import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import { Ionic2Calendar} from 'ionic2-calendar2';


@NgModule({
  declarations: [
    CalendarPage,
	Ionic2Calendar
  ],
  imports: [
    IonicPageModule.forChild(CalendarPage)
  ],
  exports: [
    CalendarPage
  ],
  providers: [
	Ionic2Calendar,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
 ]
})

export class CalendarPageModule {}
