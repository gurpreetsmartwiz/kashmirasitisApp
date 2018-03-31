import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { HomePage } from '../pages/home/home';
import {DataservicePage} from '../pages/dataservice/dataservice';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  notificationList = [];


  
  constructor(public dataService:DataservicePage, private _notification: OneSignal,private alertCtrl: AlertController,public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen) {
	this.initializeApp();
	localStorage.setItem('view','abc') ;
	var data = localStorage.getItem('status');
	this.dataService.setUserLoginStatus(data);

	//localStorage.setItem('storagelist',JSON.stringify(this.notificationList)) ;
	 //let data = localStorage.getItem('storagelist') ; 
	 //this.notificationList = JSON.parse(data);
	// console.log(this.notificationList);
	
	//console.log(JSON.parse(data))

  }
  
 
  
 
   initializeApp() {
		this.platform.ready().then(() => {	
		    this.statusBar.styleDefault();
			this.splashScreen.hide();
			
		
			
							
			if (this.platform.is('cordova')) {
				
				
				// Push Notifications
                this._notification.startInit(this.dataService.oneSignalAndroidAppId,this.dataService.oneSignalAndroidSenderId);
				this._notification.inFocusDisplaying(this._notification.OSInFocusDisplayOption.Notification);
				this._notification.setSubscription(true);
				this._notification.handleNotificationReceived().subscribe(jsonDataResult => {
			    // let alert1 = this.alertCtrl.create({
					// title: jsonDataResult.payload.title,
					// subTitle: jsonDataResult.payload.body,
					// buttons: ['OK']
				  // });
				  // alert1.present();
				  console.log('notificationOpenedCallback: ' + JSON.stringify(jsonDataResult));
				  //this.pushNotificationData(jsonDataResult.payload.title,jsonDataResult.payload.body);
				});
				this._notification.handleNotificationOpened().subscribe(jsonData => {
				  // let alert = this.alertCtrl.create({
					// title: jsonData.notification.payload.title,
					// subTitle: jsonData.notification.payload.body,
					// buttons: ['OK']
				  // });
				  // alert.present();
				  console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
				  //this.pushNotificationData(jsonData.notification.payload.title,jsonData.notification.payload.body);
				});
				this._notification.endInit();
					
			}
			  
		})
   }

 
  pushNotificationData(ttl,msg){ 
    // let data = localStorage.getItem('storagelist') ; 
	// this.notificationList = JSON.parse(data);
	// console.log(this.notificationList);
    // this.notificationList.push({title:ttl, message:msg});
	// localStorage.setItem('storagelist', JSON.stringify(this.notificationList)) ;  
	// let data = JSON.parse(localStorage.getItem('storagelist')) ; 
	// alert(JSON.stringify(data))
  }
 
  
 
 
   openPage(component) {
     this.nav.push(component);
    }
  
}

