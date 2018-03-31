import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, LoadingController } from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';


@IonicPage()
@Component({
  selector: 'page-add-matrimony',
  templateUrl: 'add-matrimony.html',
})
export class AddMatrimonyPage {
  name;
  ph_number;
  email;
  lookingFor;
  detail;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController,public dataService:DataservicePage, public loadingCtrl:LoadingController) {
     
  }

  
  
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMatrimonyPage');
  }
  
  
  
  
  
  submitMatrimony() {
    let loader = this.loadingCtrl.create({});
    loader.present();	
	var myThis = this;  
	let data = new FormData();
		data.append('name',this.name)
		data.append('number',this.ph_number)
		data.append('email',this.email)
		data.append('looking_for',this.lookingFor)
		data.append('details',this.detail)
	
     myThis.dataService.Post_API_Data('matrimonies/add_matrimony',data,
	 function(result){
		loader.dismiss(); 
		console.log(result);
		if(result.status == '2'){
		   myThis.confirmResponse();
		}
		else{
          myThis.submitResponse(result.msg,result.status);	
		}		
	 },
	 function(){
		loader.dismiss();  
		alert("Sever Error");  
	 })

   } 


   
   
      
    confirmResponse() {
    let alert = this.alertCtrl.create({
      subTitle:'you already have one matrimonial posted with us, do you want to post another matrimonial?',
         buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.nullData();
          }
        },
        {
          text: 'Proceed',
          handler: data => {
            this.proceedMatrimony();
          }
        }
      ]
    });
    alert.present();
   }
  
   
   
   

   proceedMatrimony() {
    let loader = this.loadingCtrl.create({});
    loader.present();	
	var myThis = this;  
	let data = new FormData();
		data.append('name',this.name)
		data.append('number',this.ph_number)
		data.append('email',this.email)
		data.append('looking_for',this.lookingFor)
		data.append('details',this.detail)
	
     myThis.dataService.Post_API_Data('matrimonies/add_matrimony_proceed',data,
	 function(result){
		loader.dismiss(); 
		console.log(result);
        myThis.submitResponse(result.msg,result.status);		
	 },
	 function(){
		loader.dismiss();  
		alert("Sever Error");  
	 })

   }
   
   
   
   
 
   submitResponse(msg,status) {
    let alert = this.alertCtrl.create({
      title: 'Acknowledgement:',
      subTitle: msg,
       buttons: [
        {
          text: 'OK',
          handler: data => {
			if(status == '0'){
			    this.nullData();
			}
             else{			
				this.navCtrl.pop();
			 }
          }
	    }]
    });
    alert.present();
   }
   
   

  
  nullData(){
	    this.name = null;
        this.ph_number = null;
        this.email = null;
        this.lookingFor = null;
        this.detail = null;
  }
  
  

}
