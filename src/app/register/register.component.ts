import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {UserService} from '../services/user.service'
import { MatStepper } from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
@ViewChild('stepper') stepper:MatStepper;
@ViewChild('formone') private formDirective: NgForm;
@ViewChild('formtwo') private formDirectiveTwo: NgForm;

  constructor(public dailogRef:MatDialogRef<RegisterComponent>,private _formBuilder: FormBuilder,public service:UserService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      Passwords:this._formBuilder.group({
        confirmPassword:['',Validators.required],
        password:['',Validators.required]
      },{validator: this.comparePasswords}),
    });
    this.secondFormGroup = this._formBuilder.group({
      storeName: ['',Validators.required ],
      storePhoneNumber: ['',Validators.required],
      storeAddress: ['',Validators.required],
      storeType: ['',Validators.required],
    });
  }
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
  onClose(){
    this.dailogRef.close()
    console.log("deneme")

  }
  form1(){
    this.service.formModel.get("name").setValue(this.firstFormGroup.get("name").value)
    this.service.formModel.get("surname").setValue(this.firstFormGroup.get("surname").value)
    this.service.formModel.get("phoneNumber").setValue(this.firstFormGroup.get("phoneNumber").value)
    this.service.formModel.get("username").setValue(this.firstFormGroup.get("username").value)
    this.service.formModel.get("address").setValue(this.firstFormGroup.get("address").value)
    this.service.formModel.get("email").setValue(this.firstFormGroup.get("email").value)
    this.service.formModel.get("Passwords").get("password").setValue(this.firstFormGroup.get("Passwords").get("password").value);
    this.service.formModel.get("Passwords").get("confirmPassword").setValue(this.firstFormGroup.get("Passwords").get("confirmPassword").value);
    //console.log(this.firstFormGroup.value);
    console.log(this.service.formModel.value);
  }
  form2(){
    
    //console.log(this.secondFormGroup.value);
   
  }
  onReset(){
    this.stepper.reset();
    this.service.formModel.reset();
    this.formDirective.resetForm();
    this.formDirectiveTwo.resetForm();
    this.service.initializeFormGroup();
  }
  onEnd(){
    this.dailogRef.close()
    this.service.formModel.reset();
    this.service.initializeFormGroup();
  }
  onSubmit(){
    this.service.formModel.get("storeName").setValue(this.secondFormGroup.get("storeName").value)
    this.service.formModel.get("storeAddress").setValue(this.secondFormGroup.get("storeAddress").value)
    this.service.formModel.get("storePhoneNumber").setValue(this.secondFormGroup.get("storePhoneNumber").value)
    this.service.formModel.get("storeType").setValue(this.secondFormGroup.get("storeType").value)
    console.log(this.service.formModel.value);
    this.service.register().subscribe((res:any)=>{
      if(res.succeeded){
        this.stepper.next()
      }
      else{
        res.errors.forEach(element => {
          if(element.code=="PasswordRequiresNonAlphanumeric"){
            this.toast.error("Şifre en az bir adet simge içermelidir.","Hata")

          }
          else if(element.code=="PasswordRequiresLower"){
            this.toast.error("Şifre en az bir adet küçük harf içermelidir.","Hata")
          }
          else if(element.code=="PasswordRequiresUpper"){
            this.toast.error("Şifre en az bir adet büyük harf içermelidir.","Hata")
          }
          else if(element.code=="PasswordRequiresDigit"){
            this.toast.error("Şifre en az bir adet sayı i çermelidir.","Hata")
          }
          else if(element.code=="PasswordTooShort"){
            this.toast.error("Şifre en az 6 karakterden oluşmalıdır.","Hata")
          }
          else if(element.code=="DuplicateUserName"){
            this.toast.error("Bu kullanıcı adı kullanılıyor.","Hata")
          }
          else if(element.code=="DuplicateEmail"){
            this.toast.error("Bu email adresi kullanılıyor.","Hata")
          }
          
        
      }
        )
    }

      
    },
    err=>{
      console.log(err)
    })
    
  }

}