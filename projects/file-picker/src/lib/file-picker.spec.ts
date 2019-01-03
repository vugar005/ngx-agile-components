import { FilePickerModule } from 'projects/file-picker/src/public_api';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePickerComponent } from './file-picker.component';

fdescribe('FilePickerComponent', () => {
  let component: FilePickerComponent;
  let fixture: ComponentFixture<FilePickerComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
