import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMatrimonyPage } from './add-matrimony';
import {DataservicePage} from '../dataservice/dataservice';

@NgModule({
  declarations: [
    AddMatrimonyPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMatrimonyPage),
  ],
  exports: [
    AddMatrimonyPage
  ],
   providers: [
	DataservicePage
  ]
})
export class AddMatrimonyPageModule {}
