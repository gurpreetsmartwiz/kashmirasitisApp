import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewSearchResultModalPage } from './view-search-result-modal';

@NgModule({
  declarations: [
    ViewSearchResultModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewSearchResultModalPage),
  ],
  exports: [
    ViewSearchResultModalPage
  ]
})
export class ViewSearchResultModalPageModule {}
