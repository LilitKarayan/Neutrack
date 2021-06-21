import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { IUserLogin } from '@models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // public initialObject: object;
  public form: FormGroup;
  loginInfo: IUserLogin;
  returnToUrl: string = '';
  roles:string[];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) {
      this.authService.userRoles.subscribe(userRoles => this.roles = userRoles);
    }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.returnToUrl = params['returnToUrl'] || '/home');
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
  onSubmit() {
    const formData = this.form.getRawValue();
    const loginData = {...this.loginInfo, ...formData};
     this.authService.login(loginData);
  }

  clear() {
    this.form.reset('');
  }
}
