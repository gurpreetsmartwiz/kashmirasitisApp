import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataservicePage } from './dataservice';
import { HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    DataservicePage,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(DataservicePage),
  ],
  exports: [
    DataservicePage
  ]
})
export class DataservicePageModule {}
