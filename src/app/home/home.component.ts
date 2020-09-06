import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  selectedCss=false;
  navText="home";
  showFiller = false;

  constructor(public service:UserService,public http:HttpClient,private router:Router,private dialog:MatDialog) { 
    
  }

  ngOnInit(): void {
    console.log("loading")
    this.service.getUserProfile().subscribe(data => {
      this.service.userInfo=data;
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
  areYouSure(){
    const config=new MatDialogConfig();
    config.disableClose=false;
    config.autoFocus=false;
    config.width="400px"
    config.hasBackdrop=true
    this.dialog.open(ConfirmDialogComponent,config);
  }
 


    
  

}
