# Anguar File Uploader

This is an Angular library for file uploading. It supports
* File Upload
* File Preview (additional preview images with lightbox)
* File Validation

### Quick links
### Installing  and usage
     ``` npm install ngx-awesome-uploader --save ```

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

####   Using guide
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
##### Now you can use it in your template

```html
<ngx-file-picker
[adapter]="adapter"
>
</ngx-file-picker>
 ```
##### and in the Component:
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
### API
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

/** Custome template for dropzone. Optional */
@Input() dropzoneTemplate: TemplateRef<any>;
 ```
### Output events
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

To listen to validation errors (in case you provided).