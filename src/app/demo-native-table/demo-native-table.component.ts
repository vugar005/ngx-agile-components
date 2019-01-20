import { ApiConfig } from './../../../projects/native-table/src/lib/api-config.model';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxNativeTableModule } from 'projects/native-table/src/public_api';
import { TableDataInsertComponent } from './table-data-insert/table-data-insert.component';

@Component({
  selector: 'demo-native-table',
  templateUrl: './demo-native-table.component.html',
  styleUrls: ['./demo-native-table.component.scss']
})
export class DemoNativeTableComponent  {
 config: ApiConfig = {
  getApi: 'api/post/Permission/Datasets/GetDatasetList',
  insertApi: 'api/post/Permission/Datasets/InsertNewApplication',
  updateApi: 'api/post/Permission/Datasets/UpdateApplication',
  deleteApi: 'api/post/Permission/Datasets/DeleteDataset',
 };
 @ViewChild('table') table: NgxNativeTableModule;
  constructor(public dialog: MatDialog) { }

  initDialog(table, row = null) {
    console.log(row)
    this.dialog.open(TableDataInsertComponent, {
      data: { table: table, row: row || undefined}
    });
  }
  onOptClick(event) {
   console.log(event)
  }
}
