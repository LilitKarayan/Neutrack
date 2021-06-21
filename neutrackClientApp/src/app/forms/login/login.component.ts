import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
      password: new FormControl('', Validators.required)
    });
    // this.initialObject = {};
    // this.initializeValues();
  }

  clear() {
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
