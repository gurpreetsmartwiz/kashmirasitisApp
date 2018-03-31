import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';

@IonicPage()
@Component({
  selector: 'page-contribution',
  templateUrl: 'contribution.html',
})



export class ContributionPage {
  name;
  email;
  topic;
  contribution;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage,public alertCtrl: AlertController, public loadingCtrl:LoadingController) {
  }

  
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContributionPage');
  }
  
  
  
  
   postContributeData(){
	let loader = this.loadingCtrl.create({
		});
		loader.present();
		var myThis = this;
		let data = new FormData();
			data.append('name',myThis.name);
			data.append('email',myThis.email);
			data.append('topic',myThis.topic);
			data.append('contribution',myThis.contribution);
		
		this.dataService.Post_API_Data('contributions/add_contribution',data,
		 function(result){
			loader.dismiss(); 
			console.log(result);
			myThis.showContibutionAlert(result.msg,result.status);		
		 },
		 function(){
			loader.dismiss();  
			alert("Sever Error");  
		 })
	
  }
  
  
  
  
    showContibutionAlert(msg,status) {

		
		let alert = this.alertCtrl.create({
		  subTitle: msg,
		  buttons: [
			{
			  text: 'OK',
			  handler: data => {
				   if(status == '0')
				   {
					this.name = null;  
					this.email = null;  
					this.topic = null;  
					this.contribution = null;  
				  }
				  else{				  
				   this.navCtrl.pop();
				  }	 
			  }
			}
		  ]
		});
		alert.present();
	 }
  
  
  

}
