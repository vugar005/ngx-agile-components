import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class FilePickerService {

  constructor(private http: HttpClient) { }
  uploadFile(formData): Observable<any> {
    const api = 'https://sample-upload.free.beeceptor.com';
 //   const api = 'api/post/uploadFile';
    const req = new HttpRequest('POST', api, formData, {reportProgress: true});
    return this.http.request(req);
  }
  mockUploadFile(formData) {
    const event = new CustomEvent('customevent', {
      detail: {
        type: 'UploadProgreess'
      }
    });
    return of (event.detail);
  }
}
