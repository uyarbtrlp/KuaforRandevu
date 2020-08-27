import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private dialog:MatDialog) {
    /*const Store = window.require('electron-store');
   const store = new Store();
   console.log(store.get('x'));*/
   }

  ngOnInit(): void {
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
