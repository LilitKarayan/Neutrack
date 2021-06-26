import { TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataTableComponent } from './data-table.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {PatientEditFormDialogComponent} from '../../patients/patient-edit-form-dialog/patient-edit-form-dialog.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('DataTableComponent', () => {
  let fixture;
  let component: DataTableComponent;
  let edit_component: PatientEditFormDialogComponent;
  beforeAll(() => {
    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableComponent, PatientEditFormDialogComponent ],
      imports: [MatDialogModule, MatTableModule, MatIconModule, MatPaginatorModule, BrowserAnimationsModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include the title', () =>{
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');
    expect(button.textContent).toContain('Add Patient');
  })

  it('should have correct rows', () => {
    fixture.detectChanges();
    const rowHtmlElements = fixture.debugElement.nativeElement.querySelectorAll('tbody tr');
    expect(rowHtmlElements.length).toBe(5);
  });

  it('should have <person 1> in the first row', () => {
    fixture.detectChanges();
    const rowHtmlElements = fixture.debugElement.nativeElement.querySelectorAll('tbody tr');
    expect(rowHtmlElements[0].textContent).toContain('person 1');
  });

  
});
