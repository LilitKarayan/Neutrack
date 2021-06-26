import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    LoadingDialogComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  exports:[
    ErrorDialogComponent,
    LoadingDialogComponent
  ],
  entryComponents:[ ErrorDialogComponent,
    LoadingDialogComponent]
})
export class SharedModule { }
