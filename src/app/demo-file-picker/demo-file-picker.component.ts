import { FilePreviewModel } from './../../../projects/file-picker/src/lib/file-preview.model';
import { HttpClient } from '@angular/common/http';
import { DemoFilePickerAdapter } from './demo-file-picker.adapter';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-file-picker',
  templateUrl: './demo-file-picker.component.html',
  styleUrls: ['./demo-file-picker.component.scss']
})
export class DemoFilePickerComponent implements OnInit {
  adapter = new DemoFilePickerAdapter(this.http);
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  onValidationError(e) {
    console.log(e);
  }
  onUploadSuccess(e: FilePreviewModel) {
   console.log(e);
  }
  onRemoveSuccess(e: FilePreviewModel) {
    console.log(e);
  }

}
