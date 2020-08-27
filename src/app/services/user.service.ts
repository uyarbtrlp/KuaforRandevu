import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
readonly baseURI="http://localhost:51207/api/"
image;
formData;
fileToUpload;
progress;
message;
response:any={dbPath:''};
defaultImage;
userDetails;

  constructor(private fb:FormBuilder) { }
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
      this.image=null
      

    
  }
}
