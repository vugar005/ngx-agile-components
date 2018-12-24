import { FilePickerService } from './../../file-picker.service';
import { FilePreviewModel } from './../../file-preview.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'file-preview-item',
  templateUrl: './file-preview-item.component.html',
  styleUrls: ['./file-preview-item.component.scss']
})
export class FilePreviewItemComponent implements OnInit {
  @Output() public remove = new EventEmitter<FilePreviewModel>();
  @Output() public imageClicked = new EventEmitter<FilePreviewModel>();
  @Input() fileItem: FilePreviewModel;
  icon = 'checkmark';
  uploadProgress: number;
  constructor(
    private sanitizer: DomSanitizer,
    private fileService: FilePickerService
  ) {}

  ngOnInit() {
    this.uploadFile(this.fileItem);
  }
  getSafeUrl(file: File) {
    const url = window.URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  niceBytes(x) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0,
      n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    // include a decimal point and a tenths-place digit if presenting
    // less than ten of KB or greater units
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  }
  uploadFile(file: FilePreviewModel) {
    const form = new FormData();
    form.append('file', file.file);
    this.fileService
      .uploadFile(form)
      .subscribe((res:any) => this.handleUploadResponse(res, file));
  }
  handleUploadResponse(event: HttpEvent<any>, fileName) {
    console.log(event)
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${fileName}" of size ${fileName}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        this.uploadProgress = Math.round((100 * event.loaded) / event.total);
       console.log( `File "${fileName}" is ${this.uploadProgress}% uploaded.`);
       return;

      case HttpEventType.Response:
        console.log(`File "${fileName}" was completely uploaded!`);
        const body: any = event.body;
        if (body && body.data) {
         // this.uploaded.next(res.data.toString());
        }
        this.uploadProgress = undefined;
        return;
      default:
        this.uploadProgress = undefined;
        return `File "${fileName}" surprising upload event: ${event.type}.`;
    }
  }
  cancelFile(preview): void {
    //   this.files = this.files.filter(filePreview => filePreview.file.name !== preview.file.name);
    //   this.cropForm = new FormData();
      //  this.previewPictures = this.previewPictures.filter(pic => {
      //    return (
      //      pic.safeUrl.changingThisBreaksApplicationSecurity !==
      //      preview.safeUrl.changingThisBreaksApplicationSecurity
      //    );
      //  });
     }
}
