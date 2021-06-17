import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('')
  });

  initializeForm() {
    this.form.setValue({
      email: '',
      password: ''
    })
  }
}
