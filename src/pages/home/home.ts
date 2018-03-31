import { Component,ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController, Content,ModalController, Platform} from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { AdMobPro } from '@ionic-native/admob-pro';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
	@ViewChild(Content) content: Content;
	items: string[];
	showCategorieslist:boolean=false;
	categoryList;
	rating;
	networkAvailability:boolean=true;
	ApiResponse:boolean=false
  
	
	
  constructor(private ga: GoogleAnalytics,private admob: AdMobPro,public navCtrl: NavController, private network: Network, public alertCtrl: AlertController, public dataService:DataservicePage, public loadingCtrl:LoadingController, public modalCtrl:ModalController,  public platform: Platform, private iab: InAppBrowser) {	 
	  
	  if(localStorage.getItem('view') == 'abc'){
		  this.initCategories();
		  this.initRatings();
	   }
	   else{
		   var data = JSON.parse(localStorage.getItem('categoryListData'));
		   this.categoryList = data;	
           this.rating = localStorage.getItem('ratings');		   
	   }
	   
	   
     // this.platform.ready().then(() => {
            // var admobid = {
                // banner: 'ca-app-pub-7957971173858308/5068937357',
                // interstitial: 'ca-app-pub-7957971173858308/5667703151'
            // };

            // this.admob.createBanner({
                // adId: admobid.banner,
                // isTesting: true,
                // autoShow: true,
                // position: this.admob.AD_POSITION.BOTTOM_CENTER
            // })

            // this.admob.prepareInterstitial({
                // adId: admobid.interstitial,
                // isTesting: true,
                // autoShow: false
            // })
      // });    
	
    // this.trackWithGoogleAnalytics();	 
	 
  }
  

 
 
  
  // trackWithGoogleAnalytics(){
	  // console.log(this.ga);
	   // this.ga.startTrackerWithId('UA-115545983-1',30)
	   // .then(() => {
		 // console.log('Google analytics is ready now');
			// this.ga.trackView('CategoryPage').then((result) => {
			  // //alert(result);	
			// });
			// this.ga.debugMode();
            // this.ga.setAllowIDFACollection(true);
			// console.log(this.ga.setAllowIDFACollection(true))
		 // // Tracker is ready
		 // // You can now track pages or set additional information such as AppVersion or UserId
	   // })
	   // .catch(e => console.log('Error starting GoogleAnalytics', e));
  // }
 
  
  
  
  
  
  
 
  
  
  
  ionViewDidEnter(){
    console.log(this.network)	  
      console.log('ionViewDidLoad HomePage...');
	 
	     this.network.onConnect().subscribe(data => {
		   this.networkAvailability = true;
		   this.initCategories();
		  }, error => alert(error));
		 
		  this.network.onDisconnect().subscribe(data => {
			 this.networkAvailability = false;
		  }, error => alert(error));

   }



  Logout(){
	let loader = this.loadingCtrl.create({
    });
	loader.present();
	 var myThis = this;
     this.dataService.get_API_Data('users/logout', function(data){
		console.log(data) 
		loader.dismiss();
		myThis.dataService.setUserLoginStatus('0');
	    myThis.dataService.displayToast(data.msg);
	 },function(){
		alert("Sever Error"); 
		loader.dismiss();
	 });  
  }

  
  
   
   initCategories(){
	console.log('initCategories')   
	let loader = this.loadingCtrl.create({
    });
	loader.present();
	 var myThis = this;
     this.dataService.get_API_Data('categories/get_categories', function(data){
	    myThis.categoryList = data.categories;
		console.log(data) 
		localStorage.setItem('categoryListData',JSON.stringify(myThis.categoryList));
		loader.dismiss();
		myThis.ApiResponse = true;
	 },function(){
		alert("Sever Error"); 
		loader.dismiss();
	 });
	 
   }
   
   
   
   
   
   
   
   initRatings(){
	let loader = this.loadingCtrl.create({
    });
	loader.present();
	var myThis = this;
     this.dataService.get_API_Data('feedbacks/average_rating', function(data){
	    myThis.rating = data.average_rating;
		localStorage.setItem('ratings',myThis.rating)
		console.log( myThis.rating);
	 },function(){
		alert("Sever Error"); 
	 });
	 loader.dismiss();
   }
	
	
	
	
	
	

	
	goToCategory(val,subcat){
	   var cats = subcat;
	   console.log(cats);
		   if(!cats.length){
			   this.showAlert(val);    
		   }
		   else{
              console.log('cats.length');			   
			  this.navCtrl.push('SubcategorylistPage',{'category':val,'subcategory':subcat}); 
		   } 
	}	

  
   

  
   
  
  
  
  
    showAlert(val) {
		let alert = this.alertCtrl.create({
		  subTitle:val+" not Available",
		  buttons: ['OK']
		});
		alert.present();
    }
  
  
  




  confirmLogout(){
    let confirm = this.alertCtrl.create({
      title: 'LogOut',
      message: 'Are you sure? you want to logout.',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.Logout();
          }
        }
      ]
    });
    confirm.present();
  }


  
  
  
  
    showSubscribePrompt() {
		let prompt = this.alertCtrl.create({
		  title: 'Subscribe To Our Newsletter',
		  message: "Enter your valid email for Subscription",
		  inputs: [
			{
			  name: 'email',
			  placeholder: 'abc@gmail.com'
			},
		  ],
		  buttons: [
			{
			  text: 'Cancel',
			  handler: data => {
				console.log('Cancel clicked');
			  }
			},
			{
			  text: 'Subscribe',
			  handler: data => {
				console.log(data.email);
				this.goSubscribe(data.email);
			  }
			}
		  ]
		});
		prompt.present();
	  }

  
  
  
  
  
  
  goSubscribe(email){
	 let loader = this.loadingCtrl.create({
		});
		loader.present();
		
		let data = new FormData();
			data.append('email',email);
        let myThis = this;
		console.log(data)	
		myThis.dataService.Post_API_Data('subscriptions/add',data,
		 function(result){
			loader.dismiss(); 
			myThis.dataService.displayToast(result.msg);
			console.log(result);			
		 },
		  function(){
			 loader.dismiss();  
			 alert("Server Error");  
			 console.log("Server Error")	
		}) 
  }
  
  
  
  
  
  
   doRefresh(refresher) {
		setTimeout(() => {
		this.initRatings();	
		this.initCategories()				
		  refresher.complete();
		}, 3000);
	  }
  
  
  
  
  
  openlinkedPage(linkval){

	 try{
		 if(linkval == '1'){
	        this.iab.create(this.dataService.fbLink,'_system','location=yes,toolbar=yes,closebuttoncaption=done,toolbarposition=top,closebuttoncaption=Back');	
		 }
		 else if(linkval == '2'){
		    this.iab.create(this.dataService.websiteLink,'_system','location=yes,toolbar=yes,closebuttoncaption=done,toolbarposition=top,closebuttoncaption=Back');	
		 }
	 }catch(err){
		 alert(err);
	 }
  }
  
  

  
   
   
   openScreenView(viewName){
	 this.navCtrl.push(viewName);  
   }
  

   
  
  
}
