import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoginComponent } from '../login/login.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  selectedCss=false;
  navText="";
  showFiller = false;
  loggedUsers;
  selectedUsername;
  body={userName:""}
  baseUser;
  store;

  constructor(public service:UserService,public http:HttpClient,private router:Router,private dialog:MatDialog) { 
    const Store = window.require('electron-store');
     this.store = new Store();
  }

  ngOnInit(): void {
    if(this.router.url=="/home/summary"){
      this.navText=document.getElementById("x").id
    }
    else if(this.router.url=="/home/customers"){
      this.navText=document.getElementById("home").id
    }
    console.log("loading")
    this.service.getUserProfile().subscribe(data => {
      this.service.userInfo=data;
      console.log("loaded")
  },
  err=>{
    console.log(err)
  })
  this.service.getLoggedUsers().subscribe(x=>
    this.loggedUsers=x
    
    )
    err=>{
    console.log(err);
      
    }
    this.service.getBaseUserProfile().subscribe(data => {
      this.baseUser=data;
      console.log("loaded")
  },
  err=>{
    console.log(err)
  })
  
    
  }
  
  navigate(event){
    var target = event.target
    this.navText=target.id;

  }
  loginSelect(username){
    this.selectedUsername=username;
    this.body.userName=username
    console.log(this.service.userInfo.userName)
    this.service.loginSelect(this.body).subscribe((res:any)=>{
      localStorage.setItem("token",res.token)
      this.store.set('token',res.token)
      this.router.navigateByUrl("/login")
    }
    ,err=>{
      console.log(err)
    })

  }
  login(){
    const config=new MatDialogConfig();
    config.disableClose=false;
    config.autoFocus=false;
    config.width="auto"
    config.hasBackdrop=true
    this.dialog.open(LoginDialogComponent,config);

  }
  areYouSure(){
    const config=new MatDialogConfig();
    config.disableClose=false;
    config.autoFocus=false;
    config.width="400px"
    config.hasBackdrop=true
    this.dialog.open(ConfirmDialogComponent,config);
  }
 


    
  

}
