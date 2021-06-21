import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  @Input() isUserLoggedIn: boolean;
  activeUser: IUser;
  roles:string[];

  constructor(private authService: AuthenticationService, private router:Router) {
    this.authService.user.subscribe(user => this.activeUser = user);
    this.authService.userLoggedIn.subscribe(userLoggedIn => this.isUserLoggedIn = userLoggedIn);
    this.authService.userRoles.subscribe(userRoles => this.roles = userRoles);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.authService.user.subscribe(user => this.activeUser = user);
    this.isUserLoggedIn = this.authService.isLoggedIn();

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
    this.router.navigateByUrl('/home');
  }

}
