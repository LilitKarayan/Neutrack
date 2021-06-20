import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'neutrackClientApp';
  isUserLoggedIn = false;
  roles:any[];
  constructor(private authService: AuthenticationService){

  }
  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    this.roles = this.authService.getLoggedUserRole();
  }
}
