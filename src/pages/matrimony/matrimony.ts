import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, AlertController, LoadingController} from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';

@IonicPage()
@Component({
  selector: 'page-matrimony',
  templateUrl: 'matrimony.html',
})


export class MatrimonyPage {
@ViewChild(Slides) slides: Slides;
    imagelides:any;
    selectedGender;

	
	
	
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public dataService:DataservicePage, public loadingCtrl:LoadingController) {
	  this.initializeItems();
  }

  
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MatrimonyPage');
  }
  
  
  
  
  
   initializeItems() {
      this.imagelides = [
	            {"img":"/metrimony3.jpg"},
	            {"img":"/metrimony2.jpg"},
	            {"img":"/metrimony3.jpg"},  
				{"img":"/metrimony2.jpg"},
				 ];
    } 
	
	
	
	
	
    addMatrimonyPrompt() {
       this.navCtrl.push('AddMatrimonyPage');
    }
	
	
	
	
	
	goToSearchItem(val){
		console.log(val)
	   let loader = this.loadingCtrl.create({});
       loader.present();	   
	   var myThis = this;
       let data = new FormData();
		data.append('search',val)
		
		 this.dataService.Post_API_Data('matrimonies/search_matrimonies',data,
		 function(result){
			console.log(result);
			console.log(result.matrimonies);
			loader.dismiss();
			myThis.navCtrl.push('SearchMatrimonyPage',{lookingfor:val,dataList:result.matrimonies});		
		 },
		 function(){
			loader.dismiss(); 
			alert("Sever Error");             			
		 })	   
	  
    }
    
	 
	 
	 
	
}