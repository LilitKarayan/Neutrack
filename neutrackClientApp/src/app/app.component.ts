import { Component, OnInit } from '@angular/core';
import { IUser } from '@models';
import { AuthenticationService } from '../app/services/authentication.service';
import { InterceptorService } from '../app/services/interceptor.service';

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
  errorMessage: string;
  infMessage: string;
  constructor(private authService: AuthenticationService, private interceptor: InterceptorService){
    this.authService.user.subscribe(user => this.activeUser = user);
    this.authService.userLoggedIn.subscribe(userLoggedIn => this.isUserLoggedIn = userLoggedIn);
    this.authService.userRoles.subscribe(userRoles => this.roles = userRoles);
    this.interceptor.error.subscribe(error => this.errorMessage = error);
    this.interceptor.message.subscribe(msg => this.infMessage = msg);
  }
  ngOnInit(): void {
  }
}
