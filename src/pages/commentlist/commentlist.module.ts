import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentlistPage } from './commentlist';

@NgModule({
  declarations: [
    CommentlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentlistPage),
  ],
  exports: [
    CommentlistPage
  ]
})
export class CommentlistPageModule {}
