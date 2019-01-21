import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiConfig } from 'projects/native-table/src/lib/api-config.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor(private http: HttpClient, private dialog: MatDialog) { }
  tableActionImplement(actionObject, table, templateComponent) {
  switch (actionObject.attribute) {
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


}
