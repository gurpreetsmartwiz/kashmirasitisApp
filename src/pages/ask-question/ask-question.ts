import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Content, PopoverController } from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';



@IonicPage()
@Component({
  selector: 'page-ask-question',
  templateUrl: 'ask-question.html',
})
export class AskQuestionPage {
	@ViewChild(Content) content: Content;
	questionList:any;
	searchQuery: string = '';
    searchvalue:any
	questionListforSearch;
	public counter = 10;
	showAns:boolean=true;
	answer;
	hideSeemore:boolean = true;
	
	
	
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public loadingCtrl:LoadingController, public dataService:DataservicePage,public popoverCtrl:PopoverController) {
	  this.init_QuestionList();
	  this.checkList();
  }

  
  
  
  
   checkList(){
	 if(this.questionList == undefined){
		    this.hideSeemore=false; 	
	  }
	  else {
		  if(this.questionList.length <= 10)
		  {
		     this.hideSeemore=false;  
		  }
	  }	  
  }
  
  
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AskQuestionPage');
  }
  
  
  
  
  
  
   doRefresh(refresher) {
		setTimeout(() => {
			
		var myThis = this;
		 this.dataService.get_API_Data('asks/get_you_ask_we_reply', function(data){
			myThis.questionList = data.questions
			myThis.questionListforSearch = data.questions
			console.log( myThis.questionList);
		 },function(){
			alert("Sever Error"); 
		 });	
				
		  refresher.complete();
		}, 3000);
	}
  
  
  
  
  
  
  
  
    Sort_Searchresult(myEvent){
	let popover = this.popoverCtrl.create('PopoverPage',{})  
		 popover.present({
		  ev: myEvent
		});

		popover.onDidDismiss((popoverData) => {
		  var sortBy = popoverData;
		  if(sortBy == 'recent'){
			this.questionList = this.questionList.sort();  
		  }
		  else if(sortBy == 'older'){
			this.questionList = this.questionList.reverse(); 
		  }
		  console.log(sortBy)
		})	
  }
  
  
  
  
  
  
  
   getQuestions(ev: any) {	 
     if(this.questionList){   
	  this.questionList = this.questionListforSearch;     
		let val = ev.target.value;
		console.log(val)
		  if (val && val.trim() != '') {
		  this.questionList = this.questionList.filter((item) => {
			  console.log(item.question);
			 return (item.question.toLowerCase().indexOf(val.toLowerCase()) > -1);			  
		   })		   
		} 
	 }  
    }
	
	
	
  
  
  init_QuestionList(){
    let loader = this.loadingCtrl.create({
    });
	loader.present();
	var myThis = this;
     this.dataService.get_API_Data('asks/get_you_ask_we_reply', function(data){
	    myThis.questionList = data.questions
	    myThis.questionListforSearch = data.questions
		console.log( myThis.questionList);
	 },function(){
		alert("Sever Error"); 
	 });
	 loader.dismiss();
  }
  
  
  
  
  
  
  
    selectedQues(Ques_data){
	  this.showAns = false;
	  this.answer = Ques_data;
    }
  
  
  
  
  
  
   addQueries(){   
	let prompt = this.alertCtrl.create({
      title: 'Ask Your Query.',
      inputs: [
        {
          name: 'query',
          placeholder: 'Enter here..'
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
          text: 'Submit',
          handler: data => {
            console.log(data);
			this.postQueries(data);
          }
        }
      ]
    });
    prompt.present();
  }
	 

	 
	 
	 
	 
	postQueries(Q_data){
		let loader = this.loadingCtrl.create({
		});
		loader.present();
		var myThis = this;
		let data = new FormData();
			data.append('question',Q_data.query);
			
		this.dataService.Post_API_Data('asks/you_ask_we_reply',data,
		 function(result){
			loader.dismiss(); 
			console.log(result);
			myThis.showAckAlert(result.msg);		
		 },
		 function(){
			loader.dismiss();  
			alert("Sever Error");  
		 })
		loader.dismiss();
	} 
	 
	 
	 
	 
	 
	 
	 
	showAckAlert(msg) {
  	 let alert = this.alertCtrl.create({
		 subTitle: msg,
		  buttons: ['OK']
		});
		alert.present();
    }
  
	 
	 

	seeMoreList(){	
		if(this.questionList.length > this.counter){
			this.content.scrollTo(0, 400, 500);
		    this.counter =  this.counter + 10; 
			if((this.questionList.length > this.counter) == false){
				this.hideSeemore = false;	
			}
		}
	}
	
	 
}
  
  


