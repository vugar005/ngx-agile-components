import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  UploadEvent
} from 'ngx-file-drop';
import { CropperComponent } from 'angular-cropperjs';
import { FilePickerService } from './file-picker.service';
import { FilePreviewModel } from './file-preview.model';

@Component({
  selector: 'ngx-file-picker',
  template: `
   <div (click)="fileInput.click()" class="file-drop-wrapper">
      <file-drop
        (onFileDrop)="dropped($event)"
        [customstyle]="'custom-drag'"
        [headertext]="'Drag and drop file here'"
      >
      </file-drop>
    </div>


    <input type="file" name="file[]" id="fileInput"
           #fileInput
           (change)="onChange($event, fileInput)"
           class="file_multi_video"
          >
   <!-- <div class="actions-template">
      <button class="upload-btn" [disabled]="!(files?.length >0)" (click)="onUpload()">Upload</button>
    </div> -->

    <div class="cropperJsOverlay" *ngIf="objectForCropper">
     <div class="cropperJsBox">
       <angular-cropper #angularCropper [cropperOptions]="cropperOptions" [imageUrl]="objectForCropper.safeUrl"></angular-cropper>
       <button class="saveCropped" (click)="saveCropped()">Crop</button>
      </div>
    </div>
    <div class="file-preview-wrapper">
    <file-preview-container [previewFiles]="files" (fileRemove)="onRemove($event)"> </file-preview-container>
    </div>
   <!--  <div class="preview-container">

      <div id="images" *ngIf="previewPictures">
        <div *ngFor="let preview of previewPictures" class="image">
        <span class="cancelArrow" (click)="cancelFile(preview)">x</span>
        <img [src]="preview.safeUrl" alt="''">
        </div>
      </div>
      <div class="video-co" *ngIf="safeVideoUrl">
        <video width="400" controls>
          <source  [src]="safeVideoUrl" id="video_here">
          Your browser does not support HTML5 video.
        </video>
    </div>
    </div>
    -->

  `,
  styles: [
    `
    * {
      box-sizing: border-box;
    }
    .file-drop-wrapper {
      width: 100%;
    }
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 440px;
        padding: 20px 0;
        background: #fafbfd;
        border-radius: 6px;
      }
      .file-preview-wrapper {
        width: 100%;
      }
      .preview-container {
        display: flex;
      }
      .actions-template {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }
      .cancelArrow {
        color: #e74c3c;
        cursor: pointer;
      }
      .cropperJsOverlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.32);
      }
      .cropperJsBox {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .cropperJsBox .saveCropped {
        cursor: pointer;
        margin: 5px 0 ;
        padding: 12px 25px;
        border-radius: 6px;
        border: 0;
        color: #ffffff;
        background: #474787;
      }
      /deep/.cropper img {
        max-height: 300px !important;
    }
      #images {
        display: flex;
        justify-content: center;
        width: 500px;
        overflow-x: auto;
      }
      #images .image {
        flex: 0 0 100px;
        margin: 0 2px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      #images img {
        width: 100%;
        cursor: pointer;
      }

      .video-co {
        margin-top: 20px;
      }
      .carousel-co /deep/ a {
        color: white !important;
      }
      #fileInput {
        display: none;
      }
      .browse-btn {
        color: #333;
        padding: 4px 15px;
        border-radius: 3px;
        background-image: linear-gradient(to bottom, #e0e0e0, #b7b7b7);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        cursor: pointer;
        margin-right: 7px;
      }
      .upload-btn {
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
          0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        border: none;
        outline: 0;
        min-width: 80px;
        padding: 0 16px;
        color: #ffeded;
        background: #27ae60;
        border-radius: 2px;
        cursor: pointer;
      }
      button:disabled {
        color: rgba(0,0,0,.26);
        background: gainsboro;
      }
    `
  ]
})
export class FilePickerComponent implements OnInit, AfterViewInit {
  @ViewChild('angularCropper')
  public angularCropper: CropperComponent;
  @Output() uploaded = new EventEmitter<string>();
  /** Whether to enable cropper */
  @Input()
   enableCropper = true;
  /** Api for uploading files */
  @Input()
  uploadApi: string;
  /** Single or multiple */
  @Input()
  uploadType = 'single';
  /** image ,video or other */
  @Input()
  fileType: string;
  /** Max size of file to upload */
  @Input()
  allowedSize = 10000;
  /** Which file types to show on choose file dialog */
  @Input()
  accept: string;
   /** When defined , the video privewer will be shown */
  safeVideoUrl: SafeResourceUrl;
  /** All file list including image, video and others */
  files: FilePreviewModel[] = [];
  /** Pictures list to show in preview */
  previewPictures = [];
 /** Photo regular expression to filter photos */
  @Input() photoRegEx = /(\.jpg|\.jpeg|\.png)$/i;
  /** Video regular expression to filter videos */
  @Input() videoRegEx = /(\.mp4|\.avi|\.flv|\.mpg)$/i;

  /** Cropper options */
  cropperOptions: any;
  /** When defined , the cropper will be shown */

  objectForCropper: {safeUrl: SafeResourceUrl, file: File};
  constructor(private sanitizer: DomSanitizer, private fileService: FilePickerService) {}

  ngOnInit() {
    this.setCropperOptions();
  }
  setCropperOptions() {
    this.cropperOptions = {
      dragMode: 'crop',
      aspectRatio: 1,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      autoCropArea: 0.8
    };
  }
  ngAfterViewInit() {
    // View a list of images
  }

  onChange(e: MSInputMethodContext, fileInput: HTMLInputElement) {
    const file: File = fileInput.files[0];
    this.handleFile(file);
  }
  handleFile(file: File) {
    if (!file) {return; }
    const url = window.URL.createObjectURL(file);
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    const type = this.getFileType(file.type);
    const isValid = this.validateFile(type, file);
    if (!isValid) {return; }
    if (type === 'image' && this.enableCropper) {
     this.openClipper(safeUrl, file);
    } else {
      this.pushFile(type, file);
    }
  }
  dropped(event: UploadEvent) {
    const files = event.files;
    for (const droppedFile of event.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
         this.handleFile(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  validateFile(type: string, file: File): boolean {
    const isValidType = this.validateFileType(type, file.name);
    const isValidSize = this.validateSize(file.size);
    return isValidType && isValidSize;
  }
  pushFile(type: string, file: File): void {
    if (this.uploadType === 'single') {
      this.clearOldFiles();
      }
    if (type === 'image') {
     this.pushImage(file, file.name);
    } else if (type === 'video') {
      this.pushVideo(file);
    }
  }
  clearOldFiles(): void {
    this.previewPictures = [];
    this.files = [];
  }
  pushImage(blob: Blob, fileName: string): void {
    console.log(fileName)
    this.previewPictures.push({  file: blob});
    this.files.push({ file: blob, fileName: fileName});
  }
  pushVideo(file: File): void {
    this.safeVideoUrl = undefined;
  //  setTimeout(() => (this.safeVideoUrl = safeUrl), 10);
    this.files.push({ file: file, fileName: file.name});
  }
  openClipper(safeUrl: SafeResourceUrl, file: File): void {
    this.objectForCropper = {safeUrl: safeUrl, file: file};
  }
  closeClipper(): void {
    this.objectForCropper = undefined;
  }
  getFileType(fileExtension: string): string {
    if (fileExtension.includes('image')) {
      return 'image';
    } else if (fileExtension.includes('video')) {
      return 'video';
    } else {
      return 'other';
    }
  }
  onRemove(file: FilePreviewModel): void {
 //   this.files = this.files.filter(filePreview => filePreview.file.name !== preview.file.name);
 //   this.cropForm = new FormData();
    this.files = this.files.filter(f =>  f.fileName !== file.fileName);
    console.log(file);
    console.log(this.files)
  }

  validateFileType(type: string, value: string): boolean {
    switch (this.fileType) {
      case 'image': {
        if (this.fileType !== type) {
          console.warn(`${this.fileType} only`);
          return;
        }
        if (!this.photoRegEx.exec(value)) {
          console.warn('incorrect image format');
        } else {
          return true;
        }
        break;
      }
      case 'video': {
        if (this.fileType !== type) {
          console.warn(`${this.fileType} only`);
          return;
        }
        if (!this.videoRegEx.exec(value)) {
          console.warn('incorrect video format');
        } else {
          return true;
        }
        break;
      }
      default:
      return true;
    }
  }
  validateSize(size): boolean {
    const res = this.bytesToMb(size.toString());
    if (!res) {
      console.warn('size does not fit');
      return false;
    }
    return res;
  }
  bytesToMb(size): boolean {
    return parseFloat(size) / 1048576 <= this.allowedSize;
  }
  saveCropped(): void {
    this.angularCropper.cropper.getCroppedCanvas().toBlob(this.blobFallBack.bind(this), 'image/jpeg');
  }
  blobFallBack(blob) {
   this.pushImage(blob, this.objectForCropper.file.name);
   console.log(this.files);
  this.closeClipper();
  }


}
