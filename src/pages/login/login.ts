import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import {DataservicePage} from '../dataservice/dataservice';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {
  authFormLogin : FormGroup;
  authFormSignup : FormGroup;
  formDataLogin = {'email' :null,'password':null};
  formDataSignup = {'fname' :null,'lname' :null,'wfkashmir' :null,'country' :null,'city' :null,'email' :null,'password':null,'confirmpwd':null,'tel':null};
  LoginSignup = 'login';
  countries = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State Of", "Bonaire, Sint Eustatius And Saba", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Côte D'ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State Of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension And Tristan Da Cunha", "Saint Kitts And Nevis", "Saint Lucia", "Saint Martin (french Part)", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic Of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage, public loadingCtrl:LoadingController, private fb: FormBuilder) {
    this.authFormLogin = fb.group({
		  'email' : [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
		  'password': [null, Validators.compose([Validators.required])],
		});
		
    this.authFormSignup = fb.group({
          'fname' : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10),Validators.pattern('[a-zA-Z][a-zA-Z ]+')])],
          'lname' : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10),Validators.pattern('[a-zA-Z][a-zA-Z ]+')])],
          'wfkashmir' : [null, Validators.compose([Validators.required])],
          'country' : [null, Validators.compose([Validators.required])],
          'city' : [null, Validators.compose([Validators.required])],
		  'email' : [null, Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
		  'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16) ])],
		  'confirmpwd': [null, Validators.compose([Validators.required])],
		  'tel': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
		});
  
  }

  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }
 
  
  goResetPassword(){
	this.navCtrl.push('ResetpasswordPage');    
  }
 
 
 
  submitSignUpForm(){
	console.log(this.formDataSignup);
	let loader = this.loadingCtrl.create({
		});
		loader.present();
		var myThis = this;
		let data = new FormData();
			data.append('first_name',myThis.formDataSignup.fname);
			data.append('last_name',myThis.formDataSignup.lname);
			data.append('email',myThis.formDataSignup.email);
			data.append('password',myThis.formDataSignup.password);
			data.append('contact',myThis.formDataSignup.tel);
			data.append('residence_country',myThis.formDataSignup.country);
			data.append('residence_city',myThis.formDataSignup.city);
			data.append('kashmir_city',myThis.formDataSignup.wfkashmir);

		console.log(data)	
		try{
		myThis.dataService.Post_API_Data('users/signup',data,
		 function(result){
			loader.dismiss(); 
			myThis.dataService.displayToast(result.msg);
			console.log(result);
			 if(result.status === 1){
				myThis.reLogin(myThis.formDataSignup.email,myThis.formDataSignup.password);
				console.log("true");				
			 }else{
				myThis.dataService.setUserLoginStatus('0');
				console.log("false");
			 }			
		 },
		  function(){
			 loader.dismiss();  
			 alert("Sever Error");  
			 console.log("Sever Error")	
		})}catch(err){loader.dismiss(); console.log(err)}
  }
  
 
reLogin(email,pwd){
	let data = new FormData();
			data.append('username',email);
			data.append('password',pwd);
			data.append('role','user');
	var myThis = this;
	myThis.dataService.Post_API_Data('users/login',data,
		 function(result){
			myThis.dataService.displayToast(result.msg);
			console.log(result);
			 if(result.status === 1){
				console.log("true");
				myThis.dataService.setUserLoginStatus('1');
				myThis.navCtrl.pop();
			 }else{
				myThis.dataService.setUserLoginStatus('0');
				console.log("false");
			 }			
		 },
		  function(){ 
			 alert("Sever Error");  
			 console.log("Sever Error")	
		})
}

  
  submitLoginForm(){
	  let formFields = this.formDataLogin; 
	  console.log(formFields);
	let loader = this.loadingCtrl.create({
		});
		loader.present();
		var myThis = this;
		let data = new FormData();
			data.append('username',formFields.email);
			data.append('password',formFields.password);
			data.append('role','user');

		console.log(data)	
		try{
		myThis.dataService.Post_API_Data('users/login',data,
		 function(result){
			loader.dismiss(); 
			myThis.dataService.displayToast(result.msg);
			console.log(result);
			 if(result.status === 1){
				console.log("true");
				myThis.dataService.setUserLoginStatus('1');
				myThis.navCtrl.pop();
			 }else{
				myThis.dataService.setUserLoginStatus('0');
				console.log("false");
			 }			
		 },
		  function(){
			 loader.dismiss();  
			 alert("Sever Error");  
			 console.log("Sever Error")	
		})}catch(err){loader.dismiss();console.log(err)}
  }
  
  
}
