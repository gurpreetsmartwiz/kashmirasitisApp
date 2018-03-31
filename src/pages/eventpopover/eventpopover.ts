import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-eventpopover',
  templateUrl: 'eventpopover.html',
})



export class EventpopoverPage {
  events;

  
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
	   this.events = this.navParams.get('data');
	   console.log(this.events);
	  
  }

  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventpopoverPage');
  }
  
  
  
   close() {
    this.viewCtrl.dismiss().catch((err) => {console.log(err)});;
   }

   
   
}
