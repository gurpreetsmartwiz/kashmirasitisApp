import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubcategorylistPage } from './subcategorylist';

@NgModule({
  declarations: [
    SubcategorylistPage,
  ],
  imports: [
    IonicPageModule.forChild(SubcategorylistPage),
  ],
  exports: [
    SubcategorylistPage
  ],
    schemas: [
    CUSTOM_ELEMENTS_SCHEMA
 ]
})
export class SubcategorylistPageModule {}
