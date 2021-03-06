# Anguar File Uploader

<p align="center">
 <img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/962/square_256/angularcli.png">
 <p>

This is an Angular Library for uploading files. It supports:
* File Upload
* File Preview (additionally preview images with lightbox)
* File Validations
* Image cropper
* Custom template
* Real-Time Progress bar
* Drag and Drop

## Quick links
[Example Application](https://angular-demo-file-picker.stackblitz.io/) [StackBlitzDemo](
https://stackblitz.com/edit/angular-demo-file-picker
)
## Installing  and usage
     npm install ngx-awesome-uploader --save

#####  Load the module for your app:
```typescript
import { FilePickerModule } from 'ngx-awesome-uploader';
@NgModule({
  imports: [
    ...
    FilePickerModule
  ]
})
```

##  Using guide
In order to make library maximum compatible with apis you need to create and provide custom adapter which implements upload and remove requests. That's because I have no idea how to get file id in upload response json :) .

So this libray exposes a FilePickerAdapter abstract class which you can import on your new class file definition:
``` import { FilePickerAdapter } from  'ngx-awesome-uploader';```
After importing it to your custom adapter implementation (EG: CustomAdapter.ts), you must implement those 2 methods which are abstract in the FilePickerAdapter base class which are:
```
public  abstract  uploadFile(fileItem: FilePreviewModel): Observable<HttpEvent<any>  | string>;
public  abstract  removeFile(id: string, fileItem: FilePreviewModel): Observable<any>;
```
**Note:**  Since uploadFile method will use http progress event, it has to return **id** of file in HttpEventType.Response type, otherwise return request.
You can check DEMO adapter [here](https://github.com/vugar005/ngx-agile-components/blob/master/src/app/demo-file-picker/demo-file-picker.adapter.ts)
####  Now you can use it in your template

```html
<ngx-file-picker
[adapter]="adapter"
>
</ngx-file-picker>
 ```
####  and in the Component:
```typescript
import { HttpClient } from  '@angular/common/http';
import { DemoFilePickerAdapter } from  './demo-file-picker.adapter';
import { Component} from  '@angular/core';

@Component({
selector:  'demo-file-picker',
templateUrl:  './demo-file-picker.component.html',
styleUrls:  ['./demo-file-picker.component.scss']
})

export  class  DemoFilePickerComponent  {
adapter  =  new  DemoFilePickerAdapter(this.http);
constructor(private  http: HttpClient) { }

}
 ```
**Note:** As you see you should provide http instance to adapter.
Still in Doubt? Check [Minimal Setup Demo](https://stackblitz.com/edit/angular-demo-file-picker?file=src%2Fapp%2Fsimple-demo%2Fsimple-demo.component.html)
## API
```typescript
/** Whether to enable cropper. Default: disabled */
@Input() enableCropper  =  false;

/** Whether to show default drag and drop template. Default:true */
@Input() showeDragDropZone  =  true;

/** Whether to show default files preview container. Default: true */
@Input() showPreviewContainer  =  true;

/** Single or multiple. Default: multi */
@Input() uploadType  =  'multi';

/** Max size of selected file in MB. Default: no limit */
@Input() fileMaxSize: number;

/** Max count of file in multi-upload. Default: no limit */
@Input() fileMaxCount: number;

/** Total Max size limit of all files in MB. Default: no limit */
@Input() totalMaxSize: number;

/** Which file types to show on choose file dialog. Default: show all */
@Input() accept: string;

/** File extensions filter. Default: any exteion */
@Input() fileExtensions: String;

/** Cropper options if cropper enabled. Default:
	dragMode:  'crop',
	aspectRatio:  1,
	autoCrop:  true,
	movable:  true,
	zoomable:  true,
	scalable:  true,
	autoCropArea:  0.8
 */
@Input() cropperOptions: Object;

/** Custom Adapter for uploading/removing files */
@Input() adapter: FilePickerAdapter;

/** Custom template for dropzone. Optional */
@Input() dropzoneTemplate: TemplateRef<any>;
 ```
## Output events
```typescript
/** Emitted when file is uploaded via api successfully.
	Emitted for every file */
@Output() uploadSuccess  =  new  EventEmitter<FilePreviewModel>();

/** Emitted when file is removed via api successfully.
	Emitted for every file */
@Output() removeSuccess  =  new  EventEmitter<FilePreviewModel>();

/** Emitted on file validation fail */
@Output() validationError  =  new  EventEmitter<ValidationError>();

/** Emitted when file is added and passed validations. Not uploaded yet */
@Output() fileAdded  =  new  EventEmitter<FilePreviewModel>();
```
## File Validation
To listen to validation errors (in case you provided validations), validationError event ( which implements interface [ValidationError](https://github.com/vugar005/ngx-agile-components/blob/master/projects/file-picker/src/lib/validation-error.model.ts)) is emitted.]
Supported validations: <i> File Max Size, File Extension, Upload Type('single', 'multi'), Total Files Max Size, Total Files Count<i>
Check [Demo](https://stackblitz.com/edit/angular-demo-file-picker?file=src%2Fapp%2Fadvanced-demo%2Fadvanced-demo.component.ts)
## Using Cropper
Library uses cropperjs to crop images but you need  import it to use it. Example: in index html
```html
<script  src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.js"  async>  </script>
<link  rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.css"  />
```
To use cropper, you should enableCropper. Look at API section above.
You can also provide your custom cropper options.
## Custom Template
You can provide custom template to library.
I) To provide custom template for drag and drop zone, use content projection. Example:
```html
<ngx-file-picker
[adapter]="adapter"
>
	<div  class="dropzoneTemplate">
		<button>Custom</button>
	</div>
</ngx-file-picker>
 ````
 **Note:** The wrapper of your custom template must have class **dropzoneTemplate**.
 [Checkout Demo](https://stackblitz.com/edit/angular-demo-file-picker?file=src%2Fapp%2Fadvanced-demo%2Fadvanced-demo.component.html)

 II) To use custom file preview template, library emits fileAdded output event which you can listen and pickup file so you can build your own template. Library also exposes removeFileFromList method which removes files from fileList in library. To use it you need to give a reference to library:
 ```html
 <ngx-file-picker #uploader
[adapter]="adapter"
(fileAdded)="onFileAdded($event)"
>
</ngx-file-picker>
<button  (click)="removeFile()">Remove First File</button>
```
and in component:
```typescript
import { FilePreviewModel } from  'ngx-awesome-uploader';
import { ValidationError } from  'ngx-awesome-uploader';
import { FilePickerComponent } from  'ngx-awesome-uploader';
import { HttpClient } from  '@angular/common/http';
import { DemoFilePickerAdapter } from  './demo-file-picker.adapter';
import { Component, OnInit } from  '@angular/core';
@Component({
selector:  'demo-file-picker',
templateUrl:  './demo-file-picker.component.html',
styleUrls:  ['./demo-file-picker.component.scss']
})

export  class  DemoFilePickerComponent  implements  OnInit {
@ViewChild('uploader') uploader: FilePickerComponent;
adapter  =  new  DemoFilePickerAdapter(this.http);
myFiles: FilePreviewModel[] = [];
constructor(private  http: HttpClient) { }
onValidationError(error: ValidationError) {
	console.log(error);
}
onFileAdded(file: FilePreviewModel) {
	myFiles.push(file);
}
removeFile() {
	this.uploader.removeFileFromList(this.myFiles[0].fileName);
}
}
```
## Contribution
You can fork project from github. Pull requests are kindly accepted.
1. Building library: ng build file-picker
2. Running tests: ng test file-picker
3. Run demo: in app component, uncomment demo-file-picker.