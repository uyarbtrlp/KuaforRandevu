import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import {ConfirmDeleteComponent} from './confirm-delete/confirm-delete.component'
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ShowHourComponent } from './show-hour/show-hour.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers:any[];
  date:FormControl;
  pipe = new DatePipe('en-GB');

  
  
  constructor(private userService:UserService,public customerService:CustomerService,private router:Router,public dialog:MatDialog,public toast:ToastrService) { 
    this.date=new FormControl(new Date())
    this.customerService.body.Date=this.pipe.transform(this.date.value,"dd.MM.yyyy")
    
  }

  ngOnInit(): void {
    this.customerService.getCustomersWithParameter(this.customerService.body).subscribe((res:any[])=>{
      this.customerService.customers=res;
      this.customerService.filteredCustomers=this.customerService.customers
      console.log(this.customerService.customers);
    })

  }
  /*login(){
    this.userService.login(this.formdata).subscribe((res:any)=>{
      localStorage.setItem("token",res.token);
      this.router.navigateByUrl("/login")

      console.log(res);
    })
  }*/
  addCustomer(){

    const config=new MatDialogConfig();
    config.disableClose=false;
    config.autoFocus=false;
    config.width="60%"
    config.hasBackdrop=true
    this.dialog.open(AddCustomerComponent,config).afterClosed().subscribe(result => {
      this.customerService.formModel.reset()
      this.customerService.initializeFormGroup()
    });
  }
  showHour(){

    const config=new MatDialogConfig();
    config.disableClose=false;
    config.autoFocus=false;
    config.data=this.customerService.formModel.value.Date
    config.width="60%"
    config.hasBackdrop=true
    this.dialog.open(ShowHourComponent,config).afterClosed().subscribe(result => {

    });
  }
  
  onFilter(){
    this.customerService.filteredCustomers=this.customerService.customers;
    this.customerService.filteredCustomers=this.customerService.customers.filter(x=>x.name.includes(this.customerService.searchKey))
    
  }
  onClear(){
    this.customerService.searchKey=""
    this.onFilter();
  }
  
  deleteCustomer(id){
    const config=new MatDialogConfig();
    config.disableClose=false;
    config.data=id;
    config.autoFocus=false;
    config.width="500px"
    config.hasBackdrop=true
    this.dialog.open(ConfirmDeleteComponent,config);
    

  }
  dateChange(){
    this.customerService.body.Date=this.pipe.transform(this.date.value,"dd.MM.yyyy")
    this.customerService.getCustomersWithParameter(this.customerService.body).subscribe((res:any[])=>{
      this.customerService.customers=res;
      this.customerService.filteredCustomers=this.customerService.customers;
    })
    this.customerService.formModel
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    const day1 = new Date();
    day1.setDate(day1.getDate()-1);
    // Prevent Saturday and Sunday from being selected.
    return day>=day1;
  }
  approveCustomer(customer){
    this.customerService.populateForm(customer)
    this.customerService.approveCustomer().subscribe(x=>{
      
      var index=this.customerService.customers.filter(y=>y.id!=customer.id)
      this.customerService.customers=index.sort((a, b) => a.hour.localeCompare(b.hour))
      if(this.customerService.searchKey==undefined){
        this.customerService.filteredCustomers=this.customerService.customers
      }
      else{
        this.customerService.filteredCustomers=this.customerService.customers.filter(x=>x.name.includes(this.customerService.searchKey))
      }
      this.toast.success("Müşterinin işlemi tamamlandı.","Başarılı")
    },
    err=>{
      this.toast.error("Müşterinin işlemi tamamlanamadı.","Başarısız")
    })
  }
  updateCustomer(customer){
    this.customerService.populateForm(customer)
    const config=new MatDialogConfig();
    config.disableClose=false;
    config.autoFocus=false;
    config.width="60%"
    config.hasBackdrop=true
    this.dialog.open(UpdateCustomerComponent,config).afterClosed().subscribe(result => {
      
    });
  }

}
