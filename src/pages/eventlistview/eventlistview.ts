import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-eventlistview',
  templateUrl: 'eventlistview.html',
})



export class EventlistviewPage {
  eventList;
 
 
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.eventList = this.navParams.get('events');
	  console.log(this.eventList);

  }

  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventlistviewPage');
  }

  
  
}
