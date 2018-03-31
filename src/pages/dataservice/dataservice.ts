import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';

@Injectable()
export class DataservicePage {
  oneSignalAndroidAppId = '4e68fccf-3d26-44e8-b6d6-5ae4b02edf96';
  oneSignalAndroidSenderId = '951496971296';
    
  public fbLink = 'https://www.facebook.com/KashmirAsItIs';
  public websiteLink = 'http://kashmirasitis.com';  
  public imgPath = 'http://kashmir.kashmirasitis.com/app/webroot/CategoryIcons/';
  public subcatImgPath = 'http://kashmir.kashmirasitis.com/app/webroot/SubcategoryImages/';
  url = 'http://kashmir.kashmirasitis.com/';
  public footerdata = "Disclaimer: Admin is not responsible for the matrimonials posted. The information is coming from the users.";
  view;
  public userLoginStatus = null;
  
  
  constructor(public http:Http,public toastCtrl: ToastController) {

  }


  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataservicePage');
  }
  
  
  
  setUserLoginStatus(value) {
    this.userLoginStatus = value;
	localStorage.setItem('status',value) ;
  }
  
  
  
  get_API_Data(action, success, fail) {
    this.http.get(this.url+action)
     .subscribe(data => {
		  let result = data.json();
		  success(result);   
    });
  }

  
  
  
  
  
  Post_API_Data(action, body, success, fail) {
	console.log(this.url+action);  
	console.log(body);  
    this.http.post(this.url+action, body)
    .subscribe(data => {
		let result = data.json();
		success(result);   
    });
  }

  

 displayToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
 }

  

}
