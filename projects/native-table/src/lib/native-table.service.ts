import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { PageQuery } from './page-query.model';
import { ApiConfig } from './api-config.model';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
@Injectable()
export class NativeTableService {
  constructor(private http: HttpClient) {}
  getTableData$ = new Subject<void>();
  getTableData(pageQuery: PageQuery, config: ApiConfig): Observable<any> {
    this.appendAdditionFormData(pageQuery, config);
    const body = {
      kv: pageQuery
    };
    // isDevMode() ? of(mockData).pipe(delay(1000)) :
    return  this.http.post(config.getApi, JSON.stringify(body));

  }
  insertTableData(ntForm: NgForm, config: ApiConfig): Observable<any> {
    const kvData = {
      ...ntForm.value
     };
     this.appendAdditionFormData(kvData, config);
    const obj = {
      kv: kvData
    };
   return  this.http
      .post(config.insertApi, JSON.stringify(obj));
  }
 updateTableData(ntForm: NgForm, config: ApiConfig): Observable<any> {
   const kvData = {
    ...ntForm.value
   };
   this.appendAdditionFormData(kvData, config);
    const obj = {
      kv: kvData
    };
  return this.http
      .post(config.updateApi, JSON.stringify(obj));
  }
  removeRow(data, config: ApiConfig): Observable<any> {
    const body = {
      kv: {
        id: data.id
      }
    };
    return this.http.post(config.deleteApi, JSON.stringify(body));
  }
  onCofirm(data, config: ApiConfig) {
    const body = {
      kv: {
        id: data.id
      }
    };
    return this.http.post(config.confirmApi, JSON.stringify(body));
  }
  onUnCofirm(data, config: ApiConfig) {
    const body = {
      kv: {
        id: data.id
      }
    };
    return this.http.post(config.confirmApi, JSON.stringify(body));
  }
  appendAdditionFormData(kvData, config: ApiConfig) {
    const additionalFormData = config.additionalFormData;
    if (additionalFormData) {
      Object.keys(additionalFormData).forEach(key => kvData[key] = additionalFormData[key]);
    }
  }
}
