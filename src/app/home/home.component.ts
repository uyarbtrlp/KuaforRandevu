import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public service:UserService,public http:HttpClient) { 
    
  }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(data => {
      this.service.userInfo=data;
  },
  err=>{
    console.log(err)
  })
    
  }

}
