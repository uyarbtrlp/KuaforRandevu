import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
store
  constructor(private matRef:MatDialogRef<ConfirmDialogComponent>,private router:Router) { 
    const Store = window.require('electron-store');
     this.store = new Store();
  }

  ngOnInit(): void {
  }
  onClose(){
    this.matRef.close(false)
  }
  logout(){
    localStorage.removeItem('baseToken')
    localStorage.removeItem('token')
    this.store.delete('token')
    this.store.delete('baseToken')
    this.router.navigate(["/login"])
  }

}
