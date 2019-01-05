import { FilePickerService } from './file-picker.service';
import { FilePickerModule } from 'projects/file-picker/src/public_api';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePickerComponent } from './file-picker.component';
import { createMockFile, createMockPreviewFileModel } from './test-utils';
import { DomSanitizer } from '@angular/platform-browser';

describe('FilePickerComponent', () => {
  let component: FilePickerComponent;
  let fixture: ComponentFixture<FilePickerComponent>;
  let service: FilePickerService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [FilePickerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePickerComponent);
    component = fixture.componentInstance;
    service = new FilePickerService(null);
    fixture.detectChanges();
    component.enableCropper = false;
  });

  it('should use default cropper options when not provided', () => {
    const spy = spyOn(component, 'setDefaultCropperOptions');
    component.ngOnInit();
    fixture.detectChanges();
    // expect(spy).toHaveBeenCalled();
  });
 it('should not call pushFile on extension validation fails ', () => {
   const spy = spyOn(component, 'pushFile');
   component.fileExtensions = 'doc';
   const file = createMockFile('demo.png', 'image/png');
   component.handleInputFile(file);
   expect(spy).not.toHaveBeenCalled();
 });
 it('should call pushFile on extension validation success ', () => {
   const spy = spyOn(component, 'pushFile');
   component.fileExtensions = 'pdf';
   const file = createMockFile('demo.pdf', 'application/pdf');
   component.handleInputFile(file);
   expect(spy).toHaveBeenCalled();
 });
 it('should open cropper when type is image and cropper enabled', () => {
  const spy = spyOn(component, 'openCropper');
  component.enableCropper = true;
  const file = createMockFile('demo.png', 'image/png');
  component.handleInputFile(file);
  expect(spy).toHaveBeenCalled();
 });
 it('should NOT open cropper when type is not image', () => {
  const spy = spyOn(component, 'openCropper');
  component.enableCropper = true;
  const file = createMockFile('demo.pdf', 'application/pdf');
  component.handleInputFile(file);
  expect(spy).not.toHaveBeenCalled();
 });
 it('should NOT open cropper when cropper is not enabled', () => {
  const spy = spyOn(component, 'openCropper');
  component.enableCropper = false;
  const file = createMockFile('demo.png', 'image/png');
  component.handleInputFile(file);
  expect(spy).not.toHaveBeenCalled();
 });
 it('should NOT push file on size validation fail without cropper feature', () => {
   const spy = spyOn(component, 'pushFile');
   component.fileMaxSize = 1;
   const file = createMockFile('demo.png', 'image/png', 1.1);
   component.handleInputFile(file);
   expect(spy).not.toHaveBeenCalled();
 });

 it('should NOT push file on fileMaxCount validation fail', () => {
   const spy = spyOn(component, 'pushFile');
   component.fileMaxCount = 1;
   component.files.push(createMockPreviewFileModel('demo.png', 'image/png'));
   const file = createMockFile('demo2.png', 'image/png');
   component.handleInputFile(file);
   expect(spy).not.toHaveBeenCalled();
 });
 it('should NOT push another file when upload type is single', () => {
   const spy = spyOn(component, 'pushFile');
   component.uploadType = 'single';
   component.files.push(createMockPreviewFileModel('demo.png', 'image/png'));
   const file = createMockFile('demo2.png', 'image/png');
   component.handleInputFile(file);
   expect(spy).not.toHaveBeenCalled();
 });
});
