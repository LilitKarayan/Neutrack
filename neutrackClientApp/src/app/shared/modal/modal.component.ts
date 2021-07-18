import { INutritionist } from './../models/user.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  mailTo: string;
  telTo: string;
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:
    {
      title: '',
      content: '',
      details: INutritionist,
    }) { }

  ngOnInit(): void {
    this.mailTo = 'mailto:' + this.data.details.email
    this.telTo = 'tel:' + this.data.details.phoneNumber
  }

}
