import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title: string;
  info: string;
  constructor() { }

  ngOnInit(): void {
    this.title = 'Welcome to Neutrack App';
  }

}
