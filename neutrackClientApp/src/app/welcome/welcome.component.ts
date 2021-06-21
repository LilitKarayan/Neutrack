import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title: string;
  nutritionistInfo: string;
  patientInfo: string;
  roles:string[];
  getRole(){
    this.authService.userRoles.subscribe(userRoles => this.roles = userRoles);
    if(this.roles && this.roles.includes('Nutritionist')){
      this.router.navigate(['/dashboard']);
    }
  }
  constructor(private authService: AuthenticationService, private router: Router) {
    this.getRole();
   }

  ngOnInit(): void {
    this.getRole();
    this.title = 'Welcome to Neutrack';
    this.nutritionistInfo = 'Join as a nutritionist and start managing your patients fitness';
    this.patientInfo = 'Create an account and connect with registered dieticians and nutritionist';
  }

}
