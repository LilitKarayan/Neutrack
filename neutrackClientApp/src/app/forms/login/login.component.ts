import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // public initialObject: object;

  constructor(public service: LoginService) { }

  ngOnInit(): void {
    // this.initialObject = {};
    // this.initializeValues();
  }

  clear() {
    console.log("working");
    this.service.form.reset('');
    this.service.initializeForm;
  }

  // initializeValues() {
  //   this.initialObject['email'] = "";
  //   this.initialObject['password'] = "";
  // }

}
