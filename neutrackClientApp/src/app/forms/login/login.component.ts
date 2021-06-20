import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { IUserLogin } from '@models';
//import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // public initialObject: object;
  public form: FormGroup;
  loginInfo: IUserLogin;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl(''),
    });

  }

  defaultLoginInfo(): void{
    this.loginInfo.email ='';
    this.loginInfo.password = '';
  }
  onSubmit(): void {
    const formData = this.form.getRawValue();
    const addedEntity = {...this.loginInfo, ...formData};
    this.authService.login(addedEntity);
    console.log('Form data', formData);
    console.log('addedEntity', addedEntity);
  }

  clear() {
    console.log('working');
    this.form.reset('');
  }
}
