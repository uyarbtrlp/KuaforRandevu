import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  readonly baseURI="http://localhost:51207/api/"
  customers:any;
  pipe = new DatePipe('en-GB'); 
  id:string;
  body={
    Date:''

  }
  approvedBody={
    Date:''
  } 
  filteredCustomers:any[]=[]
  searchKey;
  store
  
  hours: any[] = [{hour:"08:00",disabled:false},{hour:"08:15",disabled:false},{hour:"08:30",disabled:false}
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
  hours2;
  constructor(private fb:FormBuilder,private http:HttpClient) { 

    const Store = window.require('electron-store');
    this.store = new Store();


  }
  formModel=this.fb.group({
    Name:['',[Validators.required]],
    Surname:['',Validators.required],
    Date:['',Validators.required],
    Hour:['',Validators.required],
    Transactions:[''],
    Price:[''],

 
   
    
    
  },{validator:this.emptyCheck})
  emptyCheck(fb:FormGroup){
    let name=fb.get('Name');
    let surname=fb.get('Surname');
    if(name.errors==null ||"empty" in name.errors){
      if(name.value.startsWith(" ")){
        name.setErrors({empty:true})

      }
      else{
        name.setErrors(null)
      }

    }
     if(surname.errors==null || "empty" in surname.errors){
      if(surname.value.startsWith(" ")){
        surname.setErrors({empty:true})

      }
      else{
        surname.setErrors(null)
      }
    }
    
  }
  addCustomer(){
    var body={
      Name:this.formModel.value.Name,
      Surname:this.formModel.value.Surname,
      Date:this.pipe.transform(this.formModel.value.Date,"dd.MM.yyyy"),
      Hour:this.formModel.value.Hour,
      Transactions:this.formModel.value.Transactions,
      Price:""+this.formModel.value.Price,
    }
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+this.store.get('token')})
    //var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    return this.http.post(this.baseURI+"Customers/postCustomer",body,{headers:tokenHeader})


}

approveCustomer(){
  var body={
    Name:this.formModel.value.Name,
    Surname:this.formModel.value.Surname,
    Date:this.pipe.transform(this.formModel.value.Date,"dd.MM.yyyy"),
    Hour:this.formModel.value.Hour,
    Transactions:this.formModel.value.Transactions,
    Price:this.formModel.value.Price,
    id:this.id
  }
  var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+this.store.get('token')})
  //var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
  return this.http.post(this.baseURI+"Customers/approveCustomer",body,{headers:tokenHeader})


}
deleteCustomer(id){
  let httpParams = new HttpParams().set('id', id);
    let options = { params: httpParams };
  return this.http.delete(this.baseURI+"Customers/DeleteCustomer",options)
}
updateCustomer(){
  var body={
    Name:this.formModel.value.Name,
    Surname:this.formModel.value.Surname,
    Date:this.pipe.transform(this.formModel.value.Date,"dd.MM.yyyy"),
    Hour:this.formModel.value.Hour,
    Transactions:this.formModel.value.Transactions,
    Price:this.formModel.value.Price,
    id:this.id,
  }
  return this.http.put(this.baseURI+"Customers/updateCustomer",body)
}
getCustomers(){
  var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+this.store.get('token')})
  //var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    return this.http.get(this.baseURI+"Customers/getCustomers",{headers:tokenHeader})
}
getCustomersWithParameter(body){
  var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+this.store.get('token')})
  //var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
  let params = new HttpParams().set("date",body.Date) //Create new HttpParams
    return this.http.get(this.baseURI+"Customers/getCustomers",{headers:tokenHeader,params:params})
}
getApprovedCustomers(approvedBody){
  var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+this.store.get('token')})
  //var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
  let params = new HttpParams().set("date",approvedBody.Date) //Create new HttpParams
    return this.http.get(this.baseURI+"Customers/getApprovedCustomers",{headers:tokenHeader,params:params})
}
populateForm(customer){
  let array=customer.date.split('.');
  this.formModel.setValue({
    Name:customer.name,
    Surname:customer.surname,
    Date:new Date(array[2],array[1]-1,array[0]),
    Hour:customer.hour,
    Transactions:customer.transactions,
    Price:customer.price,
  })
  this.id=customer.id
}
initializeFormGroup(){
  this.formModel.setValue({
    
      
    Name:'',
    Surname:'',
    Date:'',
    Hour:'',
    Transactions:'',
    Price:''
    })

  
}
}
