import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import * as fromModel from '@models';

@Component({
  selector: 'app-reciple-modal-dialog',
  templateUrl: './reciple-modal-dialog.component.html',
  styleUrls: ['./reciple-modal-dialog.component.css']
})
export class RecipleModalDialogComponent implements OnInit {
  recipe: fromModel.IRecipe;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
    ) {
    }

  ngOnInit(): void {
    this.recipe = this.config.data
  }

}
