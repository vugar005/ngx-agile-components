import { FilePickerService } from './../../file-picker.service';
import { FilePreviewModel } from './../../file-preview.model';
import { Component, OnInit, Input, Output, EventEmitter, Host } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { getFileType } from '../../file-upload.utils';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'file-preview-item',
  templateUrl: './file-preview-item.component.html',
  styleUrls: ['./file-preview-item.component.scss']
})
export class FilePreviewItemComponent implements OnInit {
  @Output() public remove = new EventEmitter<FilePreviewModel>();
  @Output() public imageClicked = new EventEmitter<FilePreviewModel>();
  @Input() public fileItem: FilePreviewModel;
  icon = 'checkmark';
  uploadProgress: number;
  fileType: string;
  safeUrl: SafeResourceUrl;
  uploadError: boolean;
  uploadSubscription: Subscription;
  constructor(
    private sanitizer: DomSanitizer,
    private fileService: FilePickerService,
  ) {}

  ngOnInit() {
    this.uploadFile(this.fileItem);
    this.fileType = getFileType(this.fileItem.file.type);
    this.safeUrl = this.getSafeUrl(this.fileItem.file);
  }
  getSafeUrl(file: File | Blob) {
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
  onRetry() {
    this.uploadFile(this.fileItem);
  }
  uploadFile(file: FilePreviewModel) {
    const form = new FormData();
    form.append('file', file.file);
    this.uploadSubscription =
          this.fileService.uploadFile(form)
          .subscribe((res: any) => this.handleUploadResponse(res, file), (er) => {
            this.uploadError = er;
            this.uploadProgress = undefined;
      });
  }
  handleUploadResponse(event: HttpEvent<any>, fileName) {
    switch (event.type) {
      case HttpEventType.Sent:
        return ;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        this.uploadProgress = Math.round((100 * event.loaded) / event.total);
       return;

      case HttpEventType.Response:
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
 onRemove(fileItem: FilePreviewModel): void {
  if (this.uploadSubscription) {
    this.uploadSubscription.unsubscribe();
   }
   this.remove.next(fileItem);
 }
}
