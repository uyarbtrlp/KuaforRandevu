import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-show-hour',
  templateUrl: './show-hour.component.html',
  styleUrls: ['./show-hour.component.scss']
})
export class ShowHourComponent implements OnInit {

  constructor(public dailogRef:MatDialogRef<ShowHourComponent>,public customerService:CustomerService,@Inject(MAT_DIALOG_DATA) public data: any) { }
  selectedDate;
  defaultHours: any[] = [{hour:"08:00",disabled:false},{hour:"08:15",disabled:false},{hour:"08:30",disabled:false}
  ,{hour:"08:45",disabled:false},{hour:"09:00",disabled:false},{hour:"09:15",disabled:false}
  ,{hour:"09:30",disabled:false},{hour:"09:45",disabled:false}
  ,{hour:"10:00",disabled:false},{hour:"10:15",disabled:false},{hour:"10:30",disabled:false}
  ,{hour:"10:45",disabled:false},{hour:"11:00",disabled:false},{hour:"11:15",disabled:false}
  ,{hour:"11:30",disabled:false},{hour:"11:45",disabled:false},{hour:"12:00",disabled:false}
  ,{hour:"12:15",disabled:false},{hour:"12:30",disabled:false},{hour:"12:45",disabled:false}
  ,{hour:"13:00",disabled:false},{hour:"13:15",disabled:false},{hour:"13:30",disabled:false}
  ,{hour:"13:45",disabled:false},{hour:"14:00",disabled:false},{hour:"14:15",disabled:false}
  ,{hour:"14:30",disabled:false},{hour:"14:45",disabled:false},{hour:"15:00",disabled:false}
  ,{hour:"15:15",disabled:false},{hour:"15:30",disabled:false},{hour:"15:45",disabled:false}
  ,{hour:"16:00",disabled:false},{hour:"16:15",disabled:false},{hour:"16:30",disabled:false}
  ,{hour:"16:45",disabled:false},{hour:"17:00",disabled:false},{hour:"17:15",disabled:false}
  ,{hour:"17:30",disabled:false},{hour:"17:45",disabled:false},{hour:"18:00",disabled:false}
  ,{hour:"18:15",disabled:false},{hour:"18:30",disabled:false},{hour:"18:45",disabled:false}
  ,{hour:"19:00",disabled:false},{hour:"19:15",disabled:false},{hour:"19:30",disabled:false}
  ,{hour:"19:45",disabled:false},{hour:"20:00",disabled:false},{hour:"20:15",disabled:false}
  ,{hour:"20:30",disabled:false},{hour:"20:45",disabled:false},{hour:"21:00",disabled:false}
  ,{hour:"21:15",disabled:false},{hour:"21:30",disabled:false},{hour:"21:45",disabled:false}
  ,{hour:"22:00",disabled:false},{hour:"22:15",disabled:false},{hour:"22:30",disabled:false}
  ];

  ngOnInit(): void {
    this.customerService.getCustomersWithParameter(this.customerService.body).subscribe((res:any[])=>{
      this.customerService.hours2=res;
      this.checkTime()
    })
    console.log()
    
  }
  checkTime(){
    this.customerService.hours=this.defaultHours
    this.selectedDate=this.customerService.body.Date
    this.customerService.hours.forEach(data=>{
      this.customerService.hours2.forEach(data2=>{
        if(data.hour==data2.hour && data2.date==this.selectedDate){
          data.disabled=true;
          
        }
      })
    })
  }
  onClose(){
    this.dailogRef.close()

  }

}
