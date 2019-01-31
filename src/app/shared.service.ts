import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiConfig } from 'projects/native-table/src/lib/api-config.model';
import { NgxNativeTableComponent } from 'projects/native-table/src/public_api';
import { TableEditerAction } from 'projects/native-table/src/lib/table-action.model';
import { Observable } from 'rxjs';
import { TableModel } from './demo-native-table/table.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor(private http: HttpClient, private dialog: MatDialog) { }
  tableActionImplement(actionObject: TableEditerAction, table: NgxNativeTableComponent, templateComponent) {
  switch (actionObject.type) {
    case 'toggleColumnView':
    const data = actionObject.data;
    const body = {
        viewName: data.tableName,
        columns: data.hiddenColumnNames
    };

    this.postTableData('api/post/InsertHiddenColumn', body).subscribe();
    break;
    case 'insert':
    this.dialog.open(templateComponent, {
      data: { table: table, row: undefined}
    });
   console.log('on insert');
      break;
    case 'edit':
    this.dialog.open(templateComponent, {
      data: { table: table, row: actionObject.data}
    });
   console.log('on edit');
      break;
    case 'confirm':
   //   this.onConfirm();
   console.log(actionObject.data);
   console.log('on confirm');
      break;
    case'unConfirm':
    //  this.onUnConfirm();
    console.log('on confirm');
      break;
  }
}

 appendAdditionFormData(kvData, config: ApiConfig) {
  const additionalFormData = config.additionalFormData;
  if (additionalFormData) {
    Object.keys(additionalFormData).forEach(key => kvData[key] = additionalFormData[key]);
  }
}
postTableData(url: string, kv: Object = {}): Observable<TableModel> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  return this.http.post<TableModel>(url, JSON.stringify(kv), httpOptions);
}


}
