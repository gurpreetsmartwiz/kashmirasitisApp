import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Platform} from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';
import { HomePage } from '../home/home';




@IonicPage()
@Component({
  selector: 'page-subcategorylist',
  templateUrl: 'subcategorylist.html',
})




export class SubcategorylistPage {
  public subCategories:any[];
  public subCategoriesforSearch:any[];
  cats;
  searchvalue;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage,public loadingCtrl:LoadingController,public platform: Platform) { 
	  localStorage.setItem('view','efg') ;
	  this.cats = this.navParams.get('category');
	  console.log(this.cats)
      this.subCategories = this.navParams.get('subcategory');
      this.subCategoriesforSearch = this.navParams.get('subcategory');
	  console.log(this.subCategories)
	  
	  platform.registerBackButtonAction(() => {
		  let view = this.navCtrl.getActive();
		  if(view.component.name == "SubcategorylistPage"){
				this.navCtrl.setRoot(HomePage);
		  }
      });
	  
  }
  
  
  
 
  
  checkDetail(val){
	this.navCtrl.push('DetailPage',{'subcategoryDetail':val});  
  }
  
  
  

  ionViewDidLoad() {
      console.log('ionViewDidLoad CategoryPage');
  }
  


  
  
  searchItems(ev: any){  
		let val = ev.target.value;
		console.log(val);
		var temp =[];
		
		if(val){
			for(var i =0; i<this.subCategories.length; i++){
				if(this.subCategories[i].subcategory.toLowerCase().includes(val.toLowerCase())){
					console.log(this.subCategories[i])
						temp.push(this.subCategories[i]);
						//console.log("first push: "+temp);
				}
			}
		 	this.subCategories = temp;
         }else{
			this.subCategories = this.subCategoriesforSearch;
		 }
       
   }
}