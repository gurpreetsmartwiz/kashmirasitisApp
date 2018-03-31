import { Component,Input} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController} from 'ionic-angular';
import {DataservicePage} from '../dataservice/dataservice';


@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})



export class CalendarPage {
	slideOption = {
        loop: true
    }
    currentSlide = 0;
    @Input() events = new Array<any>();
    month: Array<number>;
    current: Date;
    today: Date;
    wHeadShort: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    wHeadMed: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    previousDay: any;
    selectedDay: any;
    eventList;
    
constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataservicePage, public loadingCtrl:LoadingController,public popoverCtrl:PopoverController) {
		console.log('CalendarComponent');
        this.addEvents();
   	    this.today = new Date();
        this.current = new Date();
        this.current.setTime(this.today.getTime());
        this.monthRender(this.today.toISOString());
		
  }
	addEvents(){

	  let loader = this.loadingCtrl.create({
		});
		
		loader.present().then(() => {
		var myThis = this;
		 this.dataService.get_API_Data('calenders/get_calender', function(data){
			myThis.eventList = data.calenders;			
			console.log(myThis.eventList)			
            myThis.eventsChange(myThis.eventList);	
            loader.dismiss();			
		 },function(){
			alert("Sever Error");
			loader.dismiss();			
		 });
		})
     	 
    }
  
    isToday(day) {
        if (this.today.getDate() === day.day.getDate() && this.today.getMonth() === day.day.getMonth()) {
            return true;
        } else {
            return false;
        }
    }
    diffMonth(day) {
        if (this.current.getMonth() !== day.day.getMonth()) {
            return true;
        } else {
            return false;
        }
    }
    toDate(day) {
        return day.day.getDate();
    }

    ngOnChanges() {
        this.monthRender(this.today.toISOString());
    }

    monthRender(date: string) {
		//console.log(this.events);
		var month = new Array();
        var firstDay = new Date(date);
		
        firstDay.setDate(1);
        var firstDayNextMonth = new Date(date);
        if (firstDay.getMonth() < 11) {
            firstDayNextMonth.setMonth(firstDay.getMonth() + 1);
            firstDayNextMonth.setDate(1);
        } else {
            firstDayNextMonth.setMonth(1);
            firstDayNextMonth.setDate(1);
        }
        var lastDay = new Date(date);
        lastDay.setTime(firstDayNextMonth.getTime() - (1 * 24 * 3600000));
        var iw = firstDay.getDay();
        var dayCount = 0;
		
        // build week in month
        for (let i = 0; i <= 5; i++) {
			let oEvents: any;
            var weekDay = new Array();
            for (var j = 0; j <= 6; j++) {
                var day = new Date();
                if (i === 0 && j < iw) {
                    // previous month date
                    
                    day.setTime(firstDay.getTime() - ((iw - j) * 24 * 3600000));
                    weekDay.push({ day: day });
                } else {
                    if (dayCount < lastDay.getDate()) {
                        
                        day.setTime(firstDay.getTime() + (dayCount * 24 * 3600000));  
			
                        if (this.events) {
							
                            oEvents = this.events.filter(event => {
                                let eventDate = new Date(event.start);
								
                                return eventDate.getDate() === day.getDate()
                                    && eventDate.getMonth() === day.getMonth()
                                    && eventDate.getFullYear() === day.getFullYear();
                            });
						}
                        if (this.today.getDate() === day.getDate() && this.today.getMonth() === day.getMonth()) {
							let oDay = { day: day, events: oEvents, selected: false };
							weekDay.push(oDay);
                            this.selectedDay = oDay;
							
                        } else {
							weekDay.push({ day: day, events: oEvents, selected: true });
						}
                        dayCount++;
                    } else {
                        // next month date
                        dayCount++;
                        day.setTime(lastDay.getTime() + ((dayCount - lastDay.getDate()) * 24 * 3600000));
                        weekDay.push({ day: day, events: [], selected: true });
					}
                }
            }
			
            month.push(weekDay);
		}
        this.month = month;
		
    }

    previousMonth() {
        let previous = new Date();
        let currentMonth = this.current.getMonth();
		console.log(currentMonth)
        if (currentMonth >= 1) {
              previous.setDate(1)
			  previous.setMonth(currentMonth - 1);
			  previous.setFullYear(this.current.getFullYear());
			
        } else {
            previous.setDate(1)
			previous.setMonth(11);
			console.log(previous)
			this.current.setFullYear(this.current.getFullYear() - 1);
          
            previous.setFullYear(this.current.getFullYear());
        }
        this.current = new Date();
        this.current.setTime(previous.getTime());
		console.log(previous)
        this.monthRender(this.current.toISOString());
    }

    nextMonth() {
        let next = new Date();
        let currentMonth = this.current.getMonth();
		//console.log(this.current)
        if (currentMonth <= 10) {
            next.setDate(1);
            next.setMonth(currentMonth + 1);
            next.setFullYear(this.current.getFullYear());

        } else {
            next.setDate(1)
         	next.setMonth(0);
			this.current.setFullYear(this.current.getFullYear() + 1);
            next.setFullYear(this.current.getFullYear());
        }
        this.current = new Date();
        this.current.setTime(next.getTime());
        console.log(this.current);
        this.monthRender(this.current.toISOString());
    }
	

    selectDay(day: any) {
        day.selected = true;
        this.selectedDay = day;
        if (this.previousDay) this.previousDay.selected = false;
        this.previousDay = day;
        //console.log(day.events);
    }

    eventsChange(ev) {
		
		 var evdata = [];
		 
		 if (ev) {
				ev.forEach(function(item){
					var tempdate = item.from.split(",")
					var mydate = new Date(Number(tempdate[0]), Number(tempdate[1]-1), Number(tempdate[2]));	
				    evdata.push({start:mydate,ev_name:item.event,tithi:item.tithi});
					//console.log(evdata);
				})
		
        this.events = evdata;
		 console.log(evdata);
        this.monthRender(this.today.toISOString());
    }
	}
	
	onSlideChanged() {
        let currentIndex = 0;
        //currentIndex = this.slider.slider.activeIndex;
        if (currentIndex === 0 && this.currentSlide === 1) {
            this.previousMonth();
        } else if (currentIndex === 0 && this.currentSlide === 2) {
            this.nextMonth();
        } else if (currentIndex > this.currentSlide) {
            this.nextMonth();
        } else if (currentIndex < this.currentSlide) {
            this.previousMonth();
        }
    }

	 
	 
  


   showEvent(event,myEvent,length){
	   if(myEvent[0] == undefined){}else{
	   if(!myEvent[0].ev_name){}
       else{	   
		  let popover = this.popoverCtrl.create('EventpopoverPage',{'data':myEvent})  
			 popover.present({
			  ev: event
			})
			
			popover.dismiss();
	   }
	   }	   
	   	   
   }
  
	goToListView(){
	  this.navCtrl.push('EventlistviewPage',{events:this.eventList})
    }
   
   
   
}



