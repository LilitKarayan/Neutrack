import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MessageSnackbarComponent } from './message-snackbar.component';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    LoadingDialogComponent,
    MessageSnackbarComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  exports:[
    ErrorDialogComponent,
    LoadingDialogComponent,
    MessageSnackbarComponent,
  ],
  entryComponents:[ ErrorDialogComponent,
    LoadingDialogComponent]
})
export class SharedModule { }
