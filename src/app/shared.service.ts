import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiConfig } from 'projects/native-table/src/lib/api-config.model';
import { NgxNativeTableComponent } from 'projects/native-table/src/public_api';
import { TableEditerAction } from 'projects/native-table/src/lib/table-action.model';
import { Observable } from 'rxjs';
import { TableModel } from './demo-native-table/table.model';
import { RemoveConfirmComponent } from './demo-native-table/remove-confirm/remove-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor(private http: HttpClient, private dialog: MatDialog) { }
  tableActionImplement(actionObject: TableEditerAction, table: NgxNativeTableComponent, templateComponent) {
  switch (actionObject.type.toLowerCase()) {
    case 'togglecolumnview':
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
      break;
      case 'remove':
     const modalRef =  this.dialog.open(RemoveConfirmComponent);
      modalRef.afterClosed().subscribe(res => console.log(res));
        break;
    case 'edit':
    this.dialog.open(templateComponent, {
      data: { table: table, row: actionObject.data}
    });
      break;
    case 'delete':
      console.log(actionObject)
    break;
    case 'confirm':
   //   this.onConfirm();
   console.log('on confirm');
      break;
    case'unconfirm':
    //  this.onUnConfirm();
    console.log('on Unconfirm');
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
