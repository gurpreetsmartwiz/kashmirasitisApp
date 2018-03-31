import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatrimonyPage } from './matrimony';

import {DataservicePage} from '../dataservice/dataservice';

@NgModule({
  declarations: [
    MatrimonyPage,
  ],
  imports: [
    IonicPageModule.forChild(MatrimonyPage),
  ],
  exports: [
    MatrimonyPage
  ],
   providers: [
	DataservicePage
  ]
})
export class MatrimonyPageModule {}
