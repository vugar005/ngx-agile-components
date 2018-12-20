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
    <div>
      <div class="cropperJsOverlay" *ngIf="cropperImgUrl">
        <div class="cropperJsBox">
           <button class="saveCropped" (click)="saveCropped()">Crop</button>
           <angular-cropper #angularCropper [cropperOptions]="cropperOptions" [imageUrl]="cropperImgUrl"></angular-cropper>
       </div>
      </div>
      <div id="images" *ngIf="previewPictures">
        <div *ngFor="let preview of previewPictures" class="image">
        <span class="cancelArrow" (click)="cancelFile(preview)">x</span>
        <img [src]="preview.safeUrl" alt="''">
        </div>
      </div>
    </div>

    <div class="video-co" *ngIf="safeUrl">
      <video width="400" controls>
        <source [src]="safeUrl" id="video_here">
        Your browser does not support HTML5 video.
      </video>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
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
        width: 150px;
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
  @Input()
   enableCropper = true;
  @Input()
  uploadApi: string;
  /** Single or multiple */
  @Input()
  uploadType = 'single';
  /** image or video */
  @Input()
  fileType: string;
  @Input()
  allowedSize = 10000;
  /** Which file types to show on choose file dialog */
  @Input()
  accept: string;
  cropperJsActive = false;
  safeUrl: SafeResourceUrl;
  files = [];
  previewPictures = [];
  photoExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  videoExtensions = /(\.mp4|\.avi|\.flv|\.mpg)$/i;
  viewer: any;
  cropperOptions: any;
  cropperImgUrl: string;
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
    const url = window.URL.createObjectURL(file);
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    const type = this.getFileType(file.type);
    const isValidType = this.validateFileType(type, file.name);
    const isValidSize = this.validateSize(file.size);
    if (isValidType && isValidSize) {
      this.pushFile(type, safeUrl, file);
    }
    console.log(this.files)
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
  pushFile(type, safeUrl, file) {
    if (this.uploadType === 'single') {
       this.previewPictures = [];
       this.files = [];
      }
    if (type === 'image') {
      if (this.enableCropper) {
        this.cropperImgUrl = safeUrl;
          return;
      }
      this.previewPictures.push({ safeUrl: safeUrl, file: file });
    //  this.initViewer();
    } else if (type === 'video') {
      this.safeUrl = undefined;
      setTimeout(() => (this.safeUrl = safeUrl), 10);
    }
    this.files.push(file);
  }
  getFileType(value: string) {
    if (value.includes('image')) {
      return 'image';
    } else if (value.includes('video')) {
      return 'video';
    }
  }
  cancelFile(preview) {
    this.files = this.files.filter(file => file.name !== preview.file.name);
    this.cropForm = new FormData();
    this.previewPictures = this.previewPictures.filter(pic => {
      return (
        pic.safeUrl.changingThisBreaksApplicationSecurity !==
        preview.safeUrl.changingThisBreaksApplicationSecurity
      );
    });
  }

  validateFileType(type: string, value: string) {
    switch (this.fileType) {
      case 'image': {
        if (this.fileType !== type) {
          console.warn(`${this.fileType} only`);
          return;
        }
        if (!this.photoExtensions.exec(value)) {
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
        if (!this.videoExtensions.exec(value)) {
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
  validateSize(size) {
    const res = this.bytesToMb(size.toString());
    if (!res) {
      console.warn('size does not fit');
      return;
    }
    return res;
  }
  bytesToMb(size) {
    return parseFloat(size) / 1048576 <= this.allowedSize;
  }
  saveCropped() {
    this.angularCropper.cropper.getCroppedCanvas().toBlob(this.blobFallBack.bind(this), 'image/jpeg');
    // const url = window.URL.createObjectURL(cropped);
    // const safeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    // this.previewPictures.push({safeUrl: safeUrl, file: ''});
    // console.log(this.previewPictures)
    // this.cropperJsActive = false;
  }
  blobFallBack(blob) {
   const url = window.URL.createObjectURL(blob);
   const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
   const newFile = new File([blob], url);
   this.files.push(newFile);
   this.cropForm.append('image', blob);
   this.previewPictures.push({safeUrl: safeUrl, file: newFile});
   this.cropperImgUrl = null;
  // this.initViewer();
   this.cropperJsActive = false;
  }
  onUpload() {
    console.log(this.cropForm)
    // this.fileService.uploadFile(this.cropForm )
    // .subscribe(res => this.handleUploadResponse(res));
  }
  handleUploadResponse(res) {
    if (res && res.data) {
      this.uploaded.next(res.data.toString());
    }
  }
}
