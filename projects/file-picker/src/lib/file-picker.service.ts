import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FilePickerService {

  constructor(private httpClient: HttpClient) { }
  uploadFile(formData): Observable<any> {
    return this.httpClient.post(`api/post/uploadFile`, formData, {reportProgress: true});
  }
}
