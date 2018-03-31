import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import {DataservicePage} from '../dataservice/dataservice';

@IonicPage()
@Component({
  selector: 'page-commentlist',
  templateUrl: 'commentlist.html',
})


export class CommentlistPage {



  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage, public loadingCtrl:LoadingController) {
  
  
  }

  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad commentlist');
  }
 
 
  
 
  
}
