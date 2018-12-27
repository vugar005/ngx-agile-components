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
import {getFileType} from './file-upload.utils';
import { ValidationError, FileValidationTypes } from './validation-error.model';
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

    <div class="cropperJsOverlay" *ngIf="objectForCropper">
     <div class="cropperJsBox">
       <angular-cropper #angularCropper [cropperOptions]="cropperOptions" [imageUrl]="objectForCropper.safeUrl"></angular-cropper>
       <button class="saveCropped" (click)="saveCropped()">Crop</button>
      </div>
    </div>
    <div class="file-preview-wrapper">
    <file-preview-container [previewFiles]="files" (fileRemove)="onRemove($event)"> </file-preview-container>
    </div>

  `,
  styles: [
    `
    * {
      box-sizing: border-box;
    }
    .file-drop-wrapper {
      width: 100%;
      background: #fafbfd;
      padding-top: 20px;
    }
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow: auto;
        max-width: 440px;
        padding-bottom: 20px;
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
  @Output() validationError = new EventEmitter<ValidationError>();
  /** Whether to enable cropper */
  @Input()
   enableCropper = true;
  /** Api for uploading files */
  @Input()
  uploadApi: string;
  /** Single or multiple */
  @Input()
  uploadType = 'single';
  /** Max size of file to upload */
  @Input()
  fileMaxSize: number;
   /** Max count of file in multi-upload */
   @Input()
   fileMaxCount: number;
   /** Total Max size of files */
  @Input()
  totalMaxSize: number;
  /** Which file types to show on choose file dialog */
  @Input()
  accept: string;
  /** All file list including image, video and others */
  files: FilePreviewModel[] = [];
 /** Photo regular expression to filter photos */
  @Input() fileExtensions: String[];
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
    this.handleInputFile(file);
  }
  handleInputFile(file: File) {
    if (!file) {return; }
    const isValidCondtion = this.checkConditions(file);
    if (!isValidCondtion) {return; }
    const type = getFileType(file.type);
    const isValid = this.validateFile(file);
    if (!isValid) {return; }
    const url = window.URL.createObjectURL(file);
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    if (type === 'image' && this.enableCropper) {
     this.openClipper(safeUrl, file);
    } else {
      this.pushFile(file);
    }
  }
  checkConditions(file: File) {
    const isValidMaxFileCount: boolean = this.checkMaxFileCount();
    if (!isValidMaxFileCount) {this.validationError.next({file: file, error: FileValidationTypes.fileMaxCount}); }
    const isValidTotalSize: boolean = this.checkTotalFileSize(file);
    if (!isValidTotalSize) {this.validationError.next({file: file, error: FileValidationTypes.totalMaxSize}); }
    return isValidMaxFileCount && isValidTotalSize;
  }
  checkMaxFileCount(): boolean {
    if (!this.fileMaxCount) {return true; }
    return this.fileMaxCount < this.files.length + 1;
  }
  checkTotalFileSize(file: File): boolean {
    if (!this.totalMaxSize) {return true; }
    const totalBits = this.files.map(f => f.file.size).reduce((acc, curr) => acc + curr, 0);
     return  this.bitsToMb(totalBits + file.size) < this.totalMaxSize;
  }
  dropped(event: UploadEvent) {
    const files = event.files;
    for (const droppedFile of event.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
         this.handleInputFile(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
       // console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  validateFile(file: File): boolean {
    const isValidType = this.validateExtension(file, file.name);
    const isValidSize = this.validateSize(file, file.size);
    return isValidType && isValidSize;
  }
  pushFile( file: File, fileName = file.name): void {
    if (this.uploadType === 'single') {
      this.clearOldFiles();
      }
      this.files.push({ file: file, fileName: fileName});
  }
  clearOldFiles(): void {
    this.files = [];
  }
  openClipper(safeUrl: SafeResourceUrl, file: File): void {
    this.objectForCropper = {safeUrl: safeUrl, file: file};
  }
  closeClipper(): void {
    this.objectForCropper = undefined;
  }
  onRemove(file: FilePreviewModel): void {
 //   this.files = this.files.filter(filePreview => filePreview.file.name !== preview.file.name);
 //   this.cropForm = new FormData();
    this.files = this.files.filter(f =>  f.fileName !== file.fileName);
  }

  validateExtension(file: File, fileName: string): boolean {
    if (!this.fileExtensions) {return true; }
    const extension = fileName.split('.').pop();
    if (this.fileExtensions && (!this.fileExtensions.includes(extension))) {
      this.validationError.next({file: file, error: FileValidationTypes.extensions});
      return false;
    }
       return true;
  }
  validateSize(file: File, size: number): boolean {
    const res: number = this.bitsToMb(size.toString());
    if (this.fileMaxSize && !(res < this.fileMaxSize)) {
      this.validationError.next({file: file, error: FileValidationTypes.fileMaxSize});
      return false;
    }
    return true;
  }
  bitsToMb(size): number {
    return parseFloat(size) / 1048576;
  }
  saveCropped(): void {
    this.angularCropper.cropper.getCroppedCanvas().toBlob(this.blobFallBack.bind(this), 'image/jpeg');
  }
  blobFallBack(blob) {
   this.pushFile(blob, this.objectForCropper.file.name);
  this.closeClipper();
  }


}
