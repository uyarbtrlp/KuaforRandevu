import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  customers;
  searchKey;
listData:MatTableDataSource<any>
customerCount=0;
priceTotal=0;
isShowDetail=false
displayedColumns:string[]=['name','surname','date','hour','transactions','price','paymentChoice']
isSelectedDate=false;
isTableHasData=false
filteredData:MatTableDataSource<any>;
@ViewChild(MatSort,{static:false}) sort:MatSort
@ViewChild(MatTable,{static:true}) table:MatTable<any>
  selectedDate='';
  day=new Date();
  constructor(public customerService:CustomerService) { 

  }

  ngOnInit(): void {
   
  }
  ngAfterViewInit() {
  }
  onClear(){
    this.searchKey=""
    this.onFilter();
  }
  onFilter(){
    if(this.searchKey==undefined){

    }
    else{
      this.listData.filter=this.searchKey.trim().toLowerCase()
      if(this.listData.filteredData.length == 0){
        this.isTableHasData = true;
      } else {
        this.isTableHasData = false;
      }
    }

    
   
  }
  onSelectionChange(){
    if(this.selectedDate=="Son 1 hafta"){
      this.customerService.approvedBody.Date=this.customerService.pipe.transform(new Date(this.day.getFullYear(),this.day.getMonth(),this.day.getDate()-7),"dd.MM.yyyy")
      this.customerService.getApprovedCustomers(this.customerService.approvedBody).subscribe(
        (res:any)=>{
          this.customers=res;
          this.listData=new MatTableDataSource(this.customers)
          this.customerCount=this.listData.data.length;
          this.isShowDetail=false
          this.priceTotal=0;
          this.listData.data.forEach(x=>{
            this.priceTotal+=Number(x.price)
          })
          this.listData.sort=this.sort;
          this.isSelectedDate=true
          this.onFilter();
          
          
          
  
        
          
          
        },err=>{
          console.log(err)
        }
      );
    }
    if(this.selectedDate=="Son 1 ay"){
      this.customerService.approvedBody.Date=this.customerService.pipe.transform(new Date(this.day.getFullYear(),this.day.getMonth()-1,this.day.getDate()),"dd.MM.yyyy")
      this.customerService.getApprovedCustomers(this.customerService.approvedBody).subscribe(
        (res:any)=>{
          this.customers=res;
          this.listData=new MatTableDataSource(this.customers)
          this.customerCount=this.listData.data.length;
          this.isShowDetail=false
          this.priceTotal=0;
          this.listData.data.forEach(x=>{
            this.priceTotal+=Number(x.price)
          })
          this.listData.sort=this.sort;
          this.isSelectedDate=true
          console.log(res)
          this.onFilter();
          
          
          
  
        
          
          
        },err=>{
          console.log(err)
        }
      );
    }
    if(this.selectedDate=="Son 3 ay"){
      console.log(this.customerService.pipe.transform(new Date(this.day.getFullYear(),this.day.getMonth()-3,this.day.getDate()),"dd.MM.yyyy"))
      this.customerService.approvedBody.Date=this.customerService.pipe.transform(new Date(this.day.getFullYear(),this.day.getMonth()-3,this.day.getDate()),"dd.MM.yyyy")
      this.customerService.getApprovedCustomers(this.customerService.approvedBody).subscribe(
        (res:any)=>{
          this.customers=res;
          this.listData=new MatTableDataSource(this.customers)
          this.customerCount=this.listData.data.length;
          this.isShowDetail=false
          this.priceTotal=0;
          this.listData.data.forEach(x=>{
            this.priceTotal+=Number(x.price)
          })
          this.listData.sort=this.sort;
          this.isSelectedDate=true
          console.log(res)
          this.onFilter();
          
          
          
  
        
          
          
        },err=>{
          console.log(err)
        }
      );
    }
    if(this.selectedDate=="Son 6 ay"){
      console.log(this.customerService.pipe.transform(new Date(this.day.getFullYear(),this.day.getMonth()-6,this.day.getDate()),"dd.MM.yyyy"))
      this.customerService.approvedBody.Date=this.customerService.pipe.transform(new Date(this.day.getFullYear(),this.day.getMonth()-6,this.day.getDate()),"dd.MM.yyyy")
      this.customerService.getApprovedCustomers(this.customerService.approvedBody).subscribe(
        (res:any)=>{
          
          this.customers=res;
          this.listData=new MatTableDataSource(this.customers)
          this.customerCount=this.listData.data.length;
          this.isShowDetail=false
          this.priceTotal=0;
          this.listData.data.forEach(x=>{
            this.priceTotal+=Number(x.price)
          })
          this.listData.sort=this.sort;
          this.isSelectedDate=true
          console.log(res)
          this.onFilter();
          
          
          
  
        
          
          
        },err=>{
          console.log(err)
        }
      );
    }
    if(this.selectedDate=="Son 1 yıl"){
      console.log(this.customerService.pipe.transform(new Date(this.day.getFullYear()-1,this.day.getMonth(),this.day.getDate()),"dd.MM.yyyy"))
      this.customerService.approvedBody.Date=this.customerService.pipe.transform(new Date(this.day.getFullYear()-1,this.day.getMonth(),this.day.getDate()),"dd.MM.yyyy")
      this.customerService.getApprovedCustomers(this.customerService.approvedBody).subscribe(
        (res:any)=>{
          this.customers=res; 
          this.listData=new MatTableDataSource(this.customers)
          this.customerCount=this.listData.data.length;
          this.isShowDetail=false
          this.priceTotal=0;
          this.listData.data.forEach(x=>{
            this.priceTotal+=Number(x.price)
          })
          this.listData.sort=this.sort;
          this.isSelectedDate=true
          console.log(res)
          this.onFilter();
          
          
          
  
        
          
          
        },err=>{
          console.log(err)
        }
      );
    }
    
  }

}
