import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';


@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})



export class FeedbackPage {
  name;
  email;
  feedback;
  rate;
  
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage,public alertCtrl: AlertController, public loadingCtrl:LoadingController) {
  }

  
  
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
  
  
  

  SubmitFeedbackData(){
	 let loader = this.loadingCtrl.create({
		});
		loader.present();
		var myThis = this;
		let data = new FormData();
			data.append('name',myThis.name);
			data.append('email',myThis.email);
			data.append('feedback',myThis.feedback);
			data.append('rating',myThis.rate);
			
		this.dataService.Post_API_Data('feedbacks/add_feedback',data,
		 function(result){
			loader.dismiss(); 
			console.log(result);
			myThis.showFeedbackAlert(result.msg,result.status);		
		 },
		 function(){
			loader.dismiss();  
			alert("Sever Error");  
		 })
		
  }
  
  
  
  
  
  
    showFeedbackAlert(msg,status) {

		let alert = this.alertCtrl.create({
		  subTitle: msg,
		  buttons: [
			{
			  text: 'OK',
			  handler: data => {
				  if(status == '0'){
					this.name = null;  
					this.email = null;  
					this.feedback = null;  
					this.rate = null;  
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
