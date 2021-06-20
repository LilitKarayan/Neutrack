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
  isUserLoggedIn = false;
  activeUser: IUser;

  constructor(private authService: AuthenticationService, private router:Router) {
    this.activeUser = this.authService.getActiveUser();
  }

  goToPage(pageName:String):void {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    this.activeUser = this.authService.getActiveUser();
    this.isUserLoggedIn = this.authService.isLoggedIn();
  }
  logout(): void {
    this.authService.logout();
  }

}
