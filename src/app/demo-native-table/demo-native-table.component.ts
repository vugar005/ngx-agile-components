import { HttpClient } from '@angular/common/http';
import { SharedService } from './../shared.service';
import { ApiConfig } from './../../../projects/native-table/src/lib/api-config.model';
import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxNativeTableComponent } from 'projects/native-table/src/public_api';
import { TableDataInsertComponent } from './table-data-insert/table-data-insert.component';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'demo-native-table',
  templateUrl: './demo-native-table.component.html',
  styleUrls: ['./demo-native-table.component.scss']
})
export class DemoNativeTableComponent  {
 config: ApiConfig = {
  getApi: 'api/post/Permission/Applications/GetApplicationList',
  insertApi: 'api/post/Permission/Applications/InsertNewApplication',
  updateApi: 'api/post/Permission/Applications/UpdateApplication',
  deleteApi: 'api/post/Permission/Comments/DeleteDatasetComment'
 };
 checkedOps = [];
 @ViewChild('table') table: NgxNativeTableComponent;
 @ViewChildren(MatCheckbox) checkboxes: QueryList<MatCheckbox>;
  constructor(public dialog: MatDialog, private sharedService: SharedService, private http: HttpClient) {
    this.http.post('api/get/Permission/UserRoles/GetUserRolePrivilege', {kv: {userRoleId: '1812100610022910099'}})
    .subscribe((res: any) => this.checkedOps  = res.tbl[0].r.map(r => r.id));
  }
  onOptClick(event) {
     this.sharedService.tableActionImplement(event, this.table, TableDataInsertComponent);
  }
  isChecked(rowData) {
    if  (!rowData && this.checkedOps) {return; }
    return this.checkedOps.includes(rowData.id);
  }
  onCellClick(e) {
    console.log(e);
  }
  onCheckBoxClick() {
    console.log(this.checkboxes.toArray());
  }
}
