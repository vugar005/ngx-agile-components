import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class FilePickerService {
  constructor() { }
  mockUploadFile(formData) {
    const event = new CustomEvent('customevent', {
      detail: {
        type: 'UploadProgreess'
      }
    });
    return of (event.detail);
  }
}
