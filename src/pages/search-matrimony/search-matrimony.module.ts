import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMatrimonyPage } from './search-matrimony';
import {DataservicePage} from '../dataservice/dataservice';

@NgModule({
  declarations: [
    SearchMatrimonyPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMatrimonyPage),
  ],
  exports: [
    SearchMatrimonyPage
  ],
   providers: [
	DataservicePage
  ]
  
})
export class SearchMatrimonyPageModule {}
