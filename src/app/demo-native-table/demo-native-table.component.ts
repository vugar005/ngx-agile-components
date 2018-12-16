import { ApiConfig } from './../../../projects/native-table/src/lib/api-config.model';
import { Component, OnInit, ViewChild } from '@angular/core';
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
   getApi: 'http://opendata.neuron.az/DispatcherRest/api/post/Permission/Applications/GetApplicationList'
 };
 @ViewChild('table') table: NgxNativeTableModule;
  constructor(public dialog: MatDialog) { }

  initDialog(table, row = null) {
    console.log('row edit emitted')
    this.dialog.open(TableDataInsertComponent, {
      data: { table: table, row: row || undefined}
    });
  }
  onOptClick(event) {
   console.log(event)
  }
}
