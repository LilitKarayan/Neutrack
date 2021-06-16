import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent {
  dataSource = ELEMENT_DATA;
  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay = ['Name', 'DOB', 'gender', 'email'];
  expandedElement: PatientsList | null;

  // constructor() { }
}

export interface PatientsList {
  Name: string;
  DOB: string;
  gender: string;
  email: string;
  current_weight: number;
  initial_weight: number;
  goal_weight: number;
  height: number;
  
}

const ELEMENT_DATA: PatientsList[] = [
  {
    
    Name: 'Lilit Karayan',
    DOB: '01/24/1992',
    gender: 'F',
    email: 'lkaraya1@my.westga.edu',
    current_weight: 10,
    initial_weight: 8,
    goal_weight: 78,
    height: 66
  }, {
    Name: 'Vincent Adeyemi',
    DOB: '01/24/1992',
    gender: 'F',
    email: 'vadeyem1@my.westga.edu',
    current_weight: 67,
    initial_weight: 89,
    goal_weight: 60,
    height: 69
  }, {
    Name: 'Jordan Barron',
    DOB: '01/24/1992',
    gender: 'F',
    email: 'barron8@my.westga.edu',
    current_weight: 89,
    initial_weight: 120,
    goal_weight: 85,
    height: 70
  },  
];
