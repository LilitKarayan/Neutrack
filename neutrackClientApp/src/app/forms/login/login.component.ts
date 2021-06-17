import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public initialObject: object;

  constructor() { }

  ngOnInit(): void {
    this.initialObject = {};
    this.initializeValues();
  }

  initializeValues() {
    this.initialObject['email'] = "";
    this.initialObject['password'] = "";
  }

}
