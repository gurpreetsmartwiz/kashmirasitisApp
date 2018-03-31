import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';


@IonicPage()
@Component({
  selector: 'page-notificationlist',
  templateUrl: 'notificationlist.html',
})



export class NotificationlistPage {
  name;
  email;
  feedback;
  rate;
  notificationList = [];
  nf = [
             {
              'title':'John Wick',
              'message':'Action'
             },
             {
              'title':'Taken 3',
              'message':'Action'
             },
             {
              'title':'The Guard',
              'message':'Comedy'
             }
            ];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage,public alertCtrl: AlertController, public loadingCtrl:LoadingController) {
     let data = localStorage.getItem('storagelist') ; 
	 this.notificationList = JSON.parse(data);
  
  }

 
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationlistPage');
  }
  
  
  
  removeNotification(item){
	let index = this.nf.indexOf(item);
	this.nf.splice(index, 1); 
	
  }
  
  
  
  addNotifications(searchTerm){
	  console.log(searchTerm)
    for(let data of this.nf) {
	  //data.value = data.value + 5;
	 if(data.message === searchTerm)
		 this.nf.push({'title':'test','message':'testmessage'})
	 }  

  }
  
  
  
}
