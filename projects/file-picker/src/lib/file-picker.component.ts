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
declare var Viewer;

@Component({
  selector: 'ngx-file-picker',
  template: `
   <div (click)="fileInput.click()">
      <file-drop
        (onFileDrop)="dropped($event)"
        [customstyle]="'custom-drag'"
        [headertext]="'Clik to browse or Drag files here'"
      >
      </file-drop>
    </div>


    <input type="file" name="file[]" id="fileInput"
           #fileInput
           (change)="onChange($event, fileInput)"
           class="file_multi_video"
          >
    <div class="actions-template">
      <button class="upload-btn" [disabled]="!(files?.length >0)" (click)="onUpload()">Upload</button>
    </div>

    <div class="cropperJsOverlay" *ngIf="safeCropperImgUrl">
     <div class="cropperJsBox">
       <button class="saveCropped" (click)="saveCropped()">Crop</button>
       <angular-cropper #angularCropper [cropperOptions]="cropperOptions" [imageUrl]="safeCropperImgUrl"></angular-cropper>
      </div>
    </div>
    <div class="file-preview-wrapper">
    <file-preview-container [previewFiles]="files"> </file-preview-container>
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
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 440px;
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
        align-items: flex-end;
      }
      .cropperJsBox .saveCropped {
        cursor: pointer;
        margin-bottom: 5px;
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
      /deep/ .custom-drag {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 150px;
        text-align:center;
        border: 2px dotted #bbb;
      }
      /deep/ .custom-drag .content {
        color: grey!important;
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

  viewer: any;
  /** Cropper options */
  cropperOptions: any;
  /** When defined , the cropper will be shown */
  safeCropperImgUrl: SafeResourceUrl;
 /** The form that will be submitted on upload */
  cropForm = new FormData();
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
  initViewer() {
    this.viewer && this.viewer.destroy();
    setTimeout(() => {
      const options = {
        // inline: true,
        url: 'data-original',
        transition: false,
        ready: e => {
        },
        show: e => {
        },
        shown: e => {
         // console.log(e.type);
        },
        hide: e => {
        },
        hidden: e => {
        },
        view: e => {
        },
        viewed: e => {
        },
        zoom: e => {
        },
        zoomed: e => {
        }
      };
      this.viewer = new Viewer(document.getElementById('images'), options);
    }, 200);
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
     this.openClipper(safeUrl);
    } else {
      this.pushFile(type, safeUrl, file);
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
  pushFile(type: string, safeUrl: SafeResourceUrl, file: File): void {
    if (this.uploadType === 'single') {
      this.clearOldFiles();
      }
    if (type === 'image') {
    //  this.initViewer();
     this.pushImage(safeUrl, file);
    } else if (type === 'video') {
      this.pushVideo(safeUrl, file);
    }
  }
  clearOldFiles(): void {
    this.previewPictures = [];
    this.files = [];
  }
  pushImage(safeUrl: SafeResourceUrl, file: File): void {
    this.previewPictures.push({ safeUrl: safeUrl, file: file });
    this.files.push({safeUrl: safeUrl, file: file});
  }
  pushVideo(safeUrl: SafeResourceUrl, file: File): void {
    this.safeVideoUrl = undefined;
    setTimeout(() => (this.safeVideoUrl = safeUrl), 10);
    this.files.push({safeUrl: safeUrl, file: file});
  }
  openClipper(safeUrl: SafeResourceUrl): void {
    this.safeCropperImgUrl = safeUrl;
  }
  closeClipper(): void {
    this.safeCropperImgUrl = undefined;
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
  cancelFile(preview): void {
    this.files = this.files.filter(filePreview => filePreview.file.name !== preview.file.name);
    this.cropForm = new FormData();
    this.previewPictures = this.previewPictures.filter(pic => {
      return (
        pic.safeUrl.changingThisBreaksApplicationSecurity !==
        preview.safeUrl.changingThisBreaksApplicationSecurity
      );
    });
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
   const url: string = window.URL.createObjectURL(blob);
   const safeImageUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
   const blobFile: File = new File([blob], url);
   this.pushImage(safeImageUrl, blobFile);
   this.cropForm.append('image', blob);
   console.log(this.files)
  // this.initViewer();
  this.closeClipper();
  }
  onUpload() {
    console.log(this.cropForm);
    // this.fileService.uploadFile(this.cropForm )
    // .subscribe(res => this.handleUploadResponse(res));
  }
  handleUploadResponse(res) {
    if (res && res.data) {
      this.uploaded.next(res.data.toString());
    }
  }
}
