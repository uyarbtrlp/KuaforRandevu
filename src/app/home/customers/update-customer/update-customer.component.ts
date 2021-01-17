import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {


  date = new FormControl();
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

  constructor(public customerService:CustomerService,public dailogRef:MatDialogRef<UpdateCustomerComponent>,public toast:ToastrService) { }

  ngOnInit(): void {
    this.customerService.getCustomersWithParameter(this.customerService.body).subscribe((res:any[])=>{
      this.customerService.hours2=res;

    })
  }
  
  onClear(){
    this.customerService.formModel.reset();
    this.customerService.initializeFormGroup(); 
  }
  onClose(){
    this.customerService.formModel.reset();
    this.customerService.initializeFormGroup();
    this.dailogRef.close()

  }
  onSubmit(){
    this.customerService.updateCustomer().subscribe((res:any)=>{
      this.customerService.customers.find(x=>{
        if(x.id==res.id){
          x.name=res.name;
          x.surname=res.surname;
          x.date=res.date;
          x.hour=res.hour;
          x.transactions=res.transactions;
          x.price=res.price;
          x.paymentChoice=res.paymentChoice
        }
      })


     
      this.customerService.customers.sort((a, b) => a.hour.localeCompare(b.hour))
      this.customerService.formModel.reset();
      if(this.customerService.searchKey==undefined){

      }
      else{
        this.customerService.filteredCustomers=this.customerService.customers.filter(x=>x.name.includes(this.customerService.searchKey))
      }
      
        this.customerService.initializeFormGroup();
        this.dailogRef.close();
        this.toast.success("Müşteri başarıyla güncellendi.","Başarılı")
        
    },
    err=>{
      this.toast.error("Müşteri güncellenemedi.","Başarısız")
    })
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    const day1 = new Date();
    day1.setDate(day1.getDate()-1);
    // Prevent Saturday and Sunday from being selected.
    return day>=day1;
  }
 
 
  checkTime(){
    this.customerService.hours=this.defaultHours
    this.selectedDate=this.customerService.pipe.transform(this.customerService.formModel.value.Date,"dd.MM.yyyy");
    this.customerService.hours.forEach(data=>{
      this.customerService.hours2.forEach(data2=>{
        if(data.hour==data2.hour && data2.date==this.selectedDate){
          data.disabled=true;
          
        }
      })
    })
  }


}
