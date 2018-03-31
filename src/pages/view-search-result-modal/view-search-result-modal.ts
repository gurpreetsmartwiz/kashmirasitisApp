import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-search-result-modal',
  templateUrl: 'view-search-result-modal.html',
})




export class ViewSearchResultModalPage {		
	Userdata:any;
	view;

	
	
	
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
	  this.Userdata = navParams.get('data');
	  this.view = navParams.get('lookingFor');
	  console.log(this.Userdata);
  }
  
  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewSearchResultModalPage');
  }
  
  
  
  
   closeModal() {
     this.viewCtrl.dismiss();
  }

  
  
  
}
