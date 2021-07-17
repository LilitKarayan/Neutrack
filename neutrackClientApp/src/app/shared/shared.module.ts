import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MessageSnackbarComponent } from './message-snackbar.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    LoadingDialogComponent,
    MessageSnackbarComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    CdkTableModule,
    MatButtonModule
  ],
  exports:[
    ErrorDialogComponent,
    LoadingDialogComponent,
    MessageSnackbarComponent,
    DeleteConfirmationComponent,
  ],
  entryComponents:[ ErrorDialogComponent,
    LoadingDialogComponent]
})
export class SharedModule { }
