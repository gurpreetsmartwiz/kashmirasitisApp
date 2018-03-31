import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import {DataservicePage} from '../dataservice/dataservice';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})


export class InfoPage {
  infoList;


  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage, public loadingCtrl:LoadingController) {
    this.information();
  
  }

  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }
 
 
   information(){

	  let loader = this.loadingCtrl.create({
		});
		
		loader.present().then(() => {
		var myThis = this;
		 this.dataService.get_API_Data('infos/information', function(data){
			myThis.infoList = data.information;			
			console.log(myThis.infoList)
			loader.dismiss();		
		 },function(){
			alert("Sever Error");
			loader.dismiss();			
		 });
		})
     	 
    }
 
  
}
