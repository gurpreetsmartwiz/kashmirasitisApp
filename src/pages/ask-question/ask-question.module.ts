import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AskQuestionPage } from './ask-question';
import {DataservicePage} from '../dataservice/dataservice';

@NgModule({
  declarations: [
    AskQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(AskQuestionPage),
  ],
  exports: [
    AskQuestionPage
  ],
  providers: [
	DataservicePage
  ]
})
export class AskQuestionPageModule {}
