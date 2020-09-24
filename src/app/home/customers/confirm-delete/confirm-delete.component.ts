import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(private matRef:MatDialogRef<ConfirmDeleteComponent>,private customerService:CustomerService,@Inject(MAT_DIALOG_DATA) public data: any,public toast:ToastrService) {
    
   }

  ngOnInit(): void {
  }
  onClose(){
    this.matRef.close(false)
  }

  delete(){
    this.customerService.deleteCustomer(this.data).subscribe(x=>{
      var index=this.customerService.customers.filter(y=>y.id!=this.data)
      this.customerService.customers=index.sort((a, b) => a.hour.localeCompare(b.hour))
      if(this.customerService.searchKey==undefined){
        this.customerService.filteredCustomers=this.customerService.customers
      }
      else{
        this.customerService.filteredCustomers=this.customerService.customers.filter(x=>x.name.includes(this.customerService.searchKey))
      }
     
      this.toast.success("Müşteri başarıyla silindi.","Başarılı")
    },
    err=>{
     this.toast.error("Müşteri silinemedi","Başarısız");
    })
    
  }

}
