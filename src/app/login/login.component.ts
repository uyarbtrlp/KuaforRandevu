import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private dialog:MatDialog,private service:UserService) {
    /*const Store = window.require('electron-store');
   const store = new Store();
   console.log(store.get('x'));*/
   }
   formModel={
    UserName:"",
    Password:""
  }

  ngOnInit(): void {
  }
  onSignIn(form:NgForm){
    this.service.login(form.value).subscribe(
      (res:any)=>{
        
          localStorage.setItem('token',res.token);
        
        

        
        

      },
      err=>{
       
        console.log(err);

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
