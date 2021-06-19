import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // public initialObject: object;
  public form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl(''),
    });
    // this.initialObject = {};
    // this.initializeValues();
  }

  clear() {
    console.log('working');
    this.form.reset('');
    //this.initializeForm;
  }

  // initializeForm() {
  //   this.form.setValue({
  //     email: '',
  //     password: ''
  //   })
  // }

  // initializeValues() {
  //   this.initialObject['email'] = "";
  //   this.initialObject['password'] = "";
  // }
}
