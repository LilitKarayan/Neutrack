import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'app/shared/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  private opened = false;
  constructor( private dialog: MatDialog) { }
  openDialog(message: string, status?: string | number): void {
    if(!this.opened) {
      this.opened = true;
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: {message, status},
        maxHeight: "100%",
        width: "540px",
        maxWidth: "100%",
        disableClose: true,
        hasBackdrop: true,
      });
      dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
      })
    }
  }
}
