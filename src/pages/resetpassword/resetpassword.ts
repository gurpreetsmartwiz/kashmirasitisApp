import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import {DataservicePage} from '../dataservice/dataservice';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})


export class ResetpasswordPage {
  FormResetPwd : FormGroup;
  formDataResetPwd = {'email':null};


  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage, public loadingCtrl:LoadingController) {
       this.FormResetPwd = fb.group({
		  'email' : [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
		});
  
  }

  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }
 
 
 
 resetPassword(){
	console.log(this.formDataResetPwd.email);
	let loader = this.loadingCtrl.create({
		});
		var myThis = this;	
		loader.present();
		let data = new FormData();
			data.append('email',myThis.formDataResetPwd.email);
			data.append('role','user');		
		myThis.dataService.Post_API_Data('users/forgot_password',data,
		 function(result){
		 	console.log(result);
			loader.dismiss(); 
			myThis.dataService.displayToast(result.msg);
             if(result.status == '1'){
				myThis.navCtrl.pop(); 
			 }else{
				//alert(result.msg);
			 }			
		 },
		 function(){
			loader.dismiss();  
			alert("Sever Error");  
		 })
		loader.dismiss(); 
  }
 
 
  
}
