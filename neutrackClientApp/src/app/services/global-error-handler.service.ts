import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { ErrorDialogService } from './error-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private errorDialogService: ErrorDialogService, private zone: NgZone) { }
  handleError(error: any): void {
    console.log(error);
    this.zone.run(() =>
      this.errorDialogService.openDialog(
        error.message || "There is an error processing the request"
      ));
  }
}
