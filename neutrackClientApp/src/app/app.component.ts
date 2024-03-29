import { Component, OnInit } from '@angular/core';
import { IUser } from '@models';
import { AuthenticationService } from '../app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'neutrackClientApp';
  isUserLoggedIn: boolean;
  roles:any[];
  activeUser: IUser;
  errors: any[];
  constructor(private authService: AuthenticationService){
    this.authService.user.subscribe(user => this.activeUser = user);
    this.authService.userLoggedIn.subscribe(userLoggedIn => this.isUserLoggedIn = userLoggedIn);
    this.authService.userRoles.subscribe(userRoles => this.roles = userRoles);
  }
  ngOnInit(): void {
  }
}
