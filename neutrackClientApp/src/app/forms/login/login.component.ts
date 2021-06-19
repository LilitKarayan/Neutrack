import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // public initialObject: object;

  constructor(
    public loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.initialObject = {};
    this.initializeValues();
  }

  clear() {
    console.log("working");
    this.loginService.form.reset('');
    this.loginService.initializeForm;
  }

  // initializeValues() {
  //   this.initialObject['email'] = "";
  //   this.initialObject['password'] = "";
  // }

}
