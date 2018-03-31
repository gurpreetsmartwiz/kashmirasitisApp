import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content,PopoverController} from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';


@IonicPage()
@Component({
  selector: 'page-search-matrimony',
  templateUrl: 'search-matrimony.html',
})





export class SearchMatrimonyPage {
	@ViewChild(Content) content: Content;
	searchItem:any;
	searchingListItems:any;
	searchingListItemslist:any;
	public counter = 10;
	sortBy;
    hideSeemore:boolean = true;
	
	
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController,public popoverCtrl:PopoverController, public dataService:DataservicePage) {
	  this.searchItem = navParams.get('lookingfor');
	  this.searchingListItems = navParams.get('dataList');  
	  console.log(this.searchingListItems);
	  this.checkList();
	   

  }

  
  
  
  checkList(){
	 if(this.searchingListItems == undefined){
		    this.hideSeemore=false; 	
	  }
	  else {
		  if(this.searchingListItems.length <= 10)
		  {
		     this.hideSeemore=false;  
		  }
	  }	  
  }
  
  
  
  
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchMatrimonyPage');
  }
  

  
  
  
  
  Sort_Searchresult(myEvent){
	let popover = this.popoverCtrl.create('PopoverPage',{})  
	 popover.present({
      ev: myEvent
    });

    popover.onDidDismiss((popoverData) => {
      this.sortBy = popoverData;
	  if(this.sortBy == 'recent'){
		this.searchingListItems = this.searchingListItems.sort();   
	  }
	  else if(this.sortBy == 'older'){
		this.searchingListItems = this.searchingListItems.reverse(); 
	  }
	  console.log( this.sortBy)
    })	
  }
  
  
  
   
	
	openModal(val) {
		setTimeout(() => { 
		console.log(val);	
		  let myModal = this.modalCtrl.create('ViewSearchResultModalPage',{data:val,lookingFor: this.searchItem});
		   myModal.onDidDismiss(data => {		
		   });
		   myModal.present();
		  }, 1000);  
	}
	
	
	
	
	
	seeMoreList(){	
		if(this.searchingListItems.length > this.counter){	
			this.content.scrollTo(0, 400, 500);
		    this.counter =  this.counter + 10; 
			if((this.searchingListItems.length > this.counter) == false){
				this.hideSeemore = false;	
			}
		}
	}

	
	
}
