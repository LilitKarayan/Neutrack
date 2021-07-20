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
import { MatCardModule } from '@angular/material/card';
import { ActivityLevelPipe } from './activity-level.pipe';
import { ModalComponent } from './modal/modal.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    LoadingDialogComponent,
    MessageSnackbarComponent,
    DeleteConfirmationComponent,
    ActivityLevelPipe,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    CdkTableModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule
  ],
  exports:[
    ErrorDialogComponent,
    LoadingDialogComponent,
    MessageSnackbarComponent,
    DeleteConfirmationComponent,
    ActivityLevelPipe,
  ],
  entryComponents:[ ErrorDialogComponent,
    LoadingDialogComponent]
})
export class SharedModule { }
