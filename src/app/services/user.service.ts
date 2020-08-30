import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
readonly baseURI="http://localhost:51207/api/"

formData;
userInfo;
  constructor(private fb:FormBuilder,private http:HttpClient) { }
  formModel=this.fb.group({
    name:['',Validators.required],
    surname:['',Validators.required],
    phoneNumber:['',Validators.required],
    username:['',Validators.required],
    address:['',Validators.required],
    storeName:['',Validators.required],
    storePhoneNumber:['',Validators.required],
    storeAddress:['',Validators.required],
    storeType:['',Validators.required],
    Passwords:this.fb.group({
      confirmPassword:['',Validators.required],
      password:['',Validators.required]
    },{validator: this.comparePasswords}),
    
    email:['',[Validators.email,Validators.required]],
  })
  comparePasswords(fb:FormGroup){
    let confirmPasswordCtrl=fb.get("confirmPassword");
    if(confirmPasswordCtrl.errors==null || "passwordMismatch" in confirmPasswordCtrl.errors){
      if(fb.get("password").value!=confirmPasswordCtrl.value){
        confirmPasswordCtrl.setErrors({passwordMismatch:true})

      }
      else{
        confirmPasswordCtrl.setErrors(null)

      }
    }
  }
  populateForm(user){
    this.formModel.patchValue({
      UserName:user.userName,
      Name:user.name,
      Surname:user.surname,
      Email:user.email
    })
    
  }
  login(formData){
    return this.http.post(this.baseURI+"User/Login",formData)
  }
  getUserProfile(){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    return this.http.get(this.baseURI+"User/GetUserProfile",{headers:tokenHeader})
  }
  register(){
    var body={
      Username:this.formModel.value.username,
      Name:this.formModel.value.name,
      Surname:this.formModel.value.surname,
      Email:this.formModel.value.email,
      PhoneNumber:this.formModel.value.phoneNumber,
      Password:this.formModel.value.Passwords.password,
      Address:this.formModel.value.address,
      StoreType:this.formModel.value.storeType,
      StorePhoneNumber:this.formModel.value.storePhoneNumber,
      StoreAddress:this.formModel.value.storeAddress,
      StoreName:this.formModel.value.storeName
    }
    return this.http.post(this.baseURI+"User/Register",body)
  }
 
  initializeFormGroup(){
    this.formModel.setValue({
      
      name:'',
      surname:'',
      phoneNumber:'',
      username:'',
      address:'',
      storeName:'',
      storePhoneNumber:'',
      storeAddress:'',
      storeType:'',
      Passwords:{
        confirmPassword:'',
        password:''
      },
      
      email:'',
        
      })
      
      

    
  }
}
