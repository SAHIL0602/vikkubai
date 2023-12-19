import { Component, OnInit } from '@angular/core';
import moment from 'moment';

interface CalendarItem {
  day: string;
  dayName: string;
  date: string;
  className: string;
  isWeekend: boolean;
  events:any[];
}

  @Component({
    selector: 'app-calender',
    templateUrl: './calender.component.html',
    styleUrl: './calender.component.css'
  })

 
  export class CalenderComponent implements OnInit {
  date = moment();
  calendar:any[] = [];
  showModal : boolean = false;
  selectedDate: CalendarItem | null =null
  isEventView: boolean = true;
  startTime: string =" ";
  endTime: string=" ";
  showInputs :boolean = false
  isEventViewActive: boolean = true;
  isTaskViewActive: boolean = false;
  meetingTitle: string = '';
  startDate: any ;
  endDate: any ;
  events:any[] = []
  description: string = " ";

  ngOnInit(): void {
    this.calendar = this.createCalendar(this.date);
  }

  createCalendar(month: moment.Moment) {
    const daysInMonth = month.daysInMonth();
    const startOfMonth = month.startOf('months').format('ddd');
    const endOfMonth = month.endOf('months').format('ddd');
    const weekdaysShort = moment.weekdaysShort();
    const calendar: any[] = [];

    const daysBefore = weekdaysShort.indexOf(startOfMonth);
    const daysAfter = weekdaysShort.length - 1 - weekdaysShort.indexOf(endOfMonth);

    const clone = month.startOf('months').clone();
    if (daysBefore > 0) {
      clone.subtract(daysBefore, 'days');
    }

    for (let i = 0; i < daysBefore; i++) {
      calendar.push(this.createCalendarItem(clone, 'previous-month'));
      clone.add(1, 'days');
    }

    for (let i = 0; i < daysInMonth; i++) {
      calendar.push(this.createCalendarItem(clone, 'in-month'));
      clone.add(1, 'days');
    }

    for (let i = 0; i < daysAfter; i++) {
      calendar.push(this.createCalendarItem(clone, 'next-month'));
      clone.add(1, 'days');
    }
    console.log(calendar);

    return calendar.reduce((pre: Array<CalendarItem[]>, curr: CalendarItem) => {
      if (pre[pre.length - 1].length < weekdaysShort.length) {
        pre[pre.length - 1].push(curr);
      } else {
        pre.push([curr]);
      }
      return pre;
    }, [[]]);


    
    
  }

  createCalendarItem(data: moment.Moment, className: string) {
    const dayName = data.format('ddd');
    return {
      day: data.format('DD'),
      dayName,
      date:data.format('DD-MM-YYYY'),
      className,
      isWeekend: dayName === 'Sun' || dayName === 'Sat',
      
    }
  }
  public nextmonth() {
    this.date.add(1, 'months');
    this.calendar = this.createCalendar(this.date);
  }

  public previousmonth() {
    this.date.subtract(1, 'months');
    this.calendar = this.createCalendar(this.date);
  }
  
  openModal(date: CalendarItem){
    this.selectedDate = date;
    const val = this.selectedDate?.date.split('-')[2] +"-"+ this.selectedDate?.date.split('-')[1] +"-"+ this.selectedDate?.date.split('-')[0]    
  this.startDate = val
  this.endDate =val
   
      const modalElement = document.getElementById('exampleModal');
      if (modalElement) {
        
        modalElement.classList.add('show');
        modalElement.style.display = 'block';}}
closeModal(){
const modalElement = document.getElementById('exampleModal');
if (modalElement) {
    
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
  }
}
showEventView() {
  this.isEventView = true; 

  this.isEventViewActive = true;
    this.isTaskViewActive = false;

}

showTaskView() {
  this.isEventView = false; 

  this.isEventViewActive = false;
    this.isTaskViewActive =  true;

}
toggleInputs() {
  this.showInputs = !this.showInputs;
}
selectDate(day: CalendarItem) {
  
console.log(this.startDate,this.selectedDate);

 
}

saveMeeting(){

  
console.log(this.selectedDate );


    if (this.selectedDate) {
console.log(this.calendar);

var newEvent

      for (let i = 0; i <= this.calendar.length; i++) {
        console.log(this.calendar[i]);
        
for(let j=0; j<=this.calendar[i].length;j++){

 const start = new Date(this.startDate);
 const end = new Date(this.endDate);
  
  var calendarDate = (this.calendar[i][j]?.date);
  calendarDate =new Date(calendarDate)
  if ( calendarDate >=start && calendarDate <= end) {

    newEvent  = {
      title: this.meetingTitle,
      startDate: this.startDate,
      endDate: this.endDate,
      startTime: this.startTime,
      endTime: this.endTime,
      description: this.description
    };
    
   

    this.calendar[i][j].events.push(newEvent);
    
  }

}
       
      
      }
     
    }
  }
}


