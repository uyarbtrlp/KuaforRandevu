import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
 let store:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private dialog:MatDialog,private service:UserService,private toast:ToastrService,private router:Router) {
    const Store = window.require('electron-store');
     store = new Store();
   }
   formModel={
    UserName:"",
    Password:""
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl("/home")
    }
  }
  onSignIn(form:NgForm){
    this.service.login(form.value).subscribe(
      (res:any)=>{
          localStorage.setItem('baseToken',res.token)
          localStorage.setItem('token',res.token);
          store.set('token',res.token)
          store.set('baseToken',res.token)
          this.router.navigateByUrl("/home")
        
        

        
        

      },
      err=>{
       
        this.toast.error(err.error.message,"Hata",{
          timeOut: 5000,
        })

        }
       
        
          

        

     
    );

  }
 

  registerWindow(){
    const config=new MatDialogConfig();
    config.disableClose=false;
    config.autoFocus=false;
    config.width="100%"
    config.hasBackdrop=true
    this.dialog.open(RegisterComponent,config).afterClosed().subscribe(result => {
      
    });
  }

}
