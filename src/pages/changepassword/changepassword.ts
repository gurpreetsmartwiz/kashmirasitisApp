import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {DataservicePage} from '../dataservice/dataservice';

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})


export class ChangepasswordPage {
  changePasswordForm : FormGroup;
  formData = {'oldpassword':null,'newPassword':null,'confirmPassword':null};


  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage, public loadingCtrl:LoadingController) {
    console.log(this.dataService.userLoginStatus);
	this.changePasswordForm = fb.group({
		  'oldpassword': [null, Validators.compose([Validators.required])],
		  'newPassword': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16) ])],
		  'confirmPassword': [null, Validators.compose([Validators.required])],
    });
		
  }

  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
 

  changePassword(){
	  console.log(this.formData);
	  let loader = this.loadingCtrl.create({
		});
		loader.present();
		var myThis = this;
		let data = new FormData();
			data.append('old_password',myThis.formData.oldpassword);
			data.append('new_password',myThis.formData.newPassword);
			data.append('role','user');

		try{
		myThis.dataService.Post_API_Data('users/changepassword',data,
		 function(result){
			loader.dismiss(); 
			myThis.dataService.displayToast(result.msg);
			console.log(result);
			 if(result.status === 1){
				console.log("true");
				myThis.Logout();
			 }else{
				console.log("false");
			 }			
		 },
		  function(){
			 loader.dismiss();  
			 alert("Sever Error");  
			 console.log("Sever Error")	
		})}catch(err){console.log(err);loader.dismiss(); }
  } 

 
   
  Logout(){
	 var myThis = this;
     myThis.dataService.get_API_Data('users/logout', function(data){
		console.log(data) ;
		 myThis.popView();
		 myThis.dataService.setUserLoginStatus('0');
	 },function(){
		alert("Sever Error"); 
	 });  
   }
 


popView(){
   this.navCtrl.pop();
}


  
}
