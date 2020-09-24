import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private matRef:MatDialogRef<ConfirmDialogComponent>,private router:Router) { }

  ngOnInit(): void {
  }
  onClose(){
    this.matRef.close(false)
  }
  logout(){
    localStorage.removeItem('baseToken')
    localStorage.removeItem('token')
    this.router.navigate(["/login"])
  }

}
