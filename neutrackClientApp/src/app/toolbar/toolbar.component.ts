import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from '@services/authentication.service';
import { IUser, IUserLogin } from '@models';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;
  testLogin: IUserLogin
  constructor(private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.testLogin = {
      email: 'vinadeyems@gmail.com',
      password: 'Ifem!de051616'
    }
  }

  async loginUser() {
    this.authService.login(this.testLogin);
  }

}
