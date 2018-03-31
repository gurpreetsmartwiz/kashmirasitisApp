import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams, LoadingController,Platform} from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';
import { HomePage } from '../home/home';




@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})




export class DetailPage {
  @ViewChild(Slides) slides: Slides;
  imagelides:any;
  subcatDetail;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage,public loadingCtrl:LoadingController,public platform: Platform) { 
     
	 this.subcatDetail = this.navParams.get('subcategoryDetail');
	 this.imagelides =  this.subcatDetail.subimages;
	 console.log(this.imagelides);
	 console.log(this.subcatDetail);
  
   }
  

  ionViewDidLoad() {
      console.log('ionViewDidLoad CategoryPage');
  }
  
  
 

}
