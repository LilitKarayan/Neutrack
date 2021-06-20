import { OnInit, AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input()roles:string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router:Router, private authService: AuthenticationService) {
    // this.roles = this.authService.getLoggedUserRole();
    this.authService.userRoles.subscribe(userRoles => this.roles = userRoles);
  }

  goToPage(pageName:String):void {
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
  }
  isNutritionist(): boolean{
    return this.roles.includes('Nutritionist');
  }

}
