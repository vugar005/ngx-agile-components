import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxFormUtils } from 'ngx-form-utils';

@Component({
  selector: 'table-data-insert',
  templateUrl: './table-data-insert.component.html',
  styleUrls: ['./table-data-insert.component.scss']
})
export class TableDataInsertComponent {

  @ViewChild('f') ntForm: NgForm;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TableDataInsertComponent>
  ) {}
  getErrors(str) {
    if (!this.ntForm || !NgxFormUtils) { return; }
     return NgxFormUtils.getErrors(this.ntForm, str);
    }

}
