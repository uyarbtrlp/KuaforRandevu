import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(private dialog:MatDialog,private service:UserService,private toast:ToastrService,private router:Router,public dailogRef:MatDialogRef<LoginDialogComponent>) {
    //const Store = window.require('electron-store');
  //store = new Store();
   }
   formModel={
    UserName:"",
    Password:""
  }

  ngOnInit(): void {
  }
  onSignIn(form:NgForm){
    this.service.loginMore(form.value).subscribe(
      (res:any)=>{
        
       
        this.service.getUserProfileWithParameter(res.token).subscribe((x:any)=>{
          if(this.service.userInfo.email==x.email){
            this.toast.error("Bu hesapla zaten giriş yapmış bulunmaktasınız.","Başarısız")

          }
          else{
            this.dailogRef.close();
          localStorage.setItem('token',res.token);
          //store.set('token',res.token)
        this.router.navigateByUrl("/login")

          }
        })
          
        
        
        
        

        
        

      },
      err=>{
       
        this.toast.error(err.error.message,"Hata",{
          timeOut: 5000,
        })

        }
       
        
          

        

     
    );

  }
 



}
