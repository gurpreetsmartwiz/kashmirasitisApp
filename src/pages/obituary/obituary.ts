import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';
import { Camera } from '@ionic-native/camera';
import { LoginPage } from '../login/login';
import { Base64 } from '@ionic-native/base64';


@IonicPage()
@Component({
  selector: 'page-obituary',
  templateUrl: 'obituary.html',
})



export class ObituaryPage {
 obituary;
 myPhoto = null;
 base64Image = null;
 DefaultPhoto = "assets/img/default.png";
 obituaryData = {'title':null,'born':null,'eternity':null,'description':null};
 obituaryList = [];
  

  
  constructor(private base64: Base64, private camera: Camera,public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage,public alertCtrl: AlertController, public loadingCtrl:LoadingController) {
    this.obituary = 'AllObi';
	this.getLoginStatus();
	this.getAllObituary();
  }

  
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ObituaryPage');
  }
  
  
  
  getAllObituary(){
	let loader = this.loadingCtrl.create({
    });
	loader.present();
	 var myThis = this;
     myThis.dataService.get_API_Data('obituaries/get_obituaries', function(data){
		myThis.obituaryList = data.obituaries; 
		console.log(data) 
		loader.dismiss();
	    alert(data.msg);
	 },function(){
		alert("Sever Error"); 
		loader.dismiss();
	 });  
  }
  
  
  
  getLoginStatus(){
	 var myThis = this;
     myThis.dataService.get_API_Data('users/check_login', function(data){
		console.log(data) 
		myThis.dataService.setUserLoginStatus(data.status);
	    alert(data.msg);
	 },function(){
		alert("Sever Error"); 
	 });
  }
  
  
  

  
  
  getImage() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Get Image From?');

    alert.addInput({
      type: 'radio',
      label: 'Camera',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Gallery',
      value: 'value2'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        data == 'value1'? this.takePhoto():this.selectPhoto()
      }
    });
    alert.present();
  }

  
  
  
  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;
	  this.base64.encodeFile(this.myPhoto).then((base64File: string) => {
		  console.log(base64File);
		  this.base64Image = base64File;
		  //alert(this.base64Image)
		}, (err) => {
		  console.log(err);
		});
	
	  //alert(this.myPhoto)
	  //alert(this.base64Image)
    }, error => {
      //this.error = JSON.stringify(error);
	  alert(JSON.stringify(error))
    });
  }

  
  
  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      //encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
	  this.base64.encodeFile(this.myPhoto).then((base64File: string) => {
		  console.log(base64File);
		  this.base64Image = base64File;
		  console.log(this.base64Image)
		}, (err) => {
		  console.log(err);
		});

    }, error => {
      //this.error = JSON.stringify(error);
	  alert(JSON.stringify(error))
    });
  }
  

  
  
  submitObituary(){
	  console.log(this.dataService.userLoginStatus);
	  console.log(this.dataService.userLoginStatus == '0');
	 if(this.dataService.userLoginStatus == '0'){
		 console.log(this.obituaryData) 
		this.navCtrl.push('LoginPage')  
	  }else{
		console.log("else case: "+this.dataService.userLoginStatus);
		console.log(this.obituaryData) 
	   let loader = this.loadingCtrl.create({
		});
		loader.present();
		
		let data = new FormData();
			data.append('title',this.obituaryData.title);
			data.append('description',this.obituaryData.description);
			data.append('dob',this.obituaryData.born);
			data.append('dod',this.obituaryData.eternity);
			data.append('img',this.base64Image);
			data.append('file',this.myPhoto);

		console.log(data)	
		this.dataService.Post_API_Data('obituaries/add',data,
		 function(result){
			loader.dismiss(); 
			alert(result.msg)
			console.log(result);
			 if(result.status === 1){
				alert("true");
			 }else{
				alert("false");
			 }			
		 },
		  function(){
			 loader.dismiss();  
			 alert("Server Error");  
			 console.log("Server Error")	
		})
		
	  }

	  // this.title = null;
	  // this.born = null;
	  // this.eternity = null;
	  // this.description = null;
  }  

  
  
    addComment(oid){   
	let prompt = this.alertCtrl.create({
      title: 'Add your comment',
      inputs: [
        {
          name: 'comment',
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
            console.log(data.comment);
			this.postComment(data.comment,oid);
          }
        }
      ]
    });
    prompt.present();
  }
  
  
  
  postComment(comment,oid){
	 let loader = this.loadingCtrl.create({
		});
		loader.present();
		
		let data = new FormData();
			data.append('comment',comment);
			data.append('oid',oid);

		console.log(data)	
		this.dataService.Post_API_Data('obituarycomments/add_comment',data,
		 function(result){
			loader.dismiss(); 
			alert(result.msg)
			console.log(result);			
		 },
		  function(){
			 loader.dismiss();  
			 alert("Server Error");  
			 console.log("Server Error")	
		}) 
  }
  
  
  
}
