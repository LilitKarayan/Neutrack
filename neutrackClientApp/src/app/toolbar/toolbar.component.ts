import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from '../services/authentication.service';
import { IUser, IUserLogin } from '../shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;
  testLogin: IUserLogin
  isUserLoggedIn = false;
  
  constructor(private authService: AuthenticationService, private router:Router) {

  }

  goToPage(pageName:String):void {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    this.testLogin = {
      email: '',
      password: ''
    }
  }

  async loginUser() {
    this.authService.login(this.testLogin);
  }

}
