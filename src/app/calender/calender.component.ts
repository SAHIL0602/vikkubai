import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsDialogComponent } from '../event-details-dialog/event-details-dialog.component';


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
    constructor(private dialog: MatDialog) {}

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
    this.createCalendar(this.date);
  }

  createCalendar(month: moment.Moment) {
    const daysInMonth = month.daysInMonth();
    const startOfMonth = month.startOf('month').format('ddd');
    const endOfMonth = month.endOf('month').format('ddd');
    const weekdaysShort = moment.weekdaysShort();
    const calendar: any[] = [];

    const daysBefore = weekdaysShort.indexOf(startOfMonth);
    const daysAfter = weekdaysShort.length - 1 - weekdaysShort.indexOf(endOfMonth);

    const clone = month.startOf('month').clone();
    if (daysBefore > 0) {
      clone.subtract(daysBefore, 'days');
    }

    
    for (let i = 0; i < daysInMonth + daysBefore; i++) {
      const className =
        i < daysBefore || i >= daysInMonth + daysBefore
          ? 'other-month'
          : 'in-month';

      const dayName = weekdaysShort[clone.day()];
      const day = clone.format('DD');
      const date = clone.format('YYYY-MM-DD');

      const calendarItem: CalendarItem = {
        day ,
        dayName,
        date,
        className,
        isWeekend: dayName === 'Sun' || dayName === 'Sat',
        events: [],
      };

      calendar.push(calendarItem);
      clone.add(1, 'days');
    }

    this.calendar = calendar;

    console.log(calendar);
  }

  public nextmonth() {
    this.date.add(1, 'months');
    this.createCalendar(this.date);
  }

  public previousmonth() {
    this.date.subtract(1, 'months');
   this.createCalendar(this.date);
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

newEvent  = {
  title: this.meetingTitle,
  startDate: this.startDate,
  endDate: this.endDate,
  startTime: this.startTime,
  endTime: this.endTime,
  description: this.description
};
 
  

 for (let i = 0; i <= this.calendar.length; i++) {
  console.log(this.calendar[i]);

  const start = new Date(this.startDate);
 const end = new Date(this.endDate);
  var calendarDate = new Date(this.calendar[i].date);

  if ( calendarDate >=start && calendarDate <= end) {

   
    
   

   
    this.calendar[i].events.push(newEvent);

  }
}
}
}
openEventDialog(event: any): void {
  this.dialog.open(EventDetailsDialogComponent, {
    data: event,
  });
}
}



