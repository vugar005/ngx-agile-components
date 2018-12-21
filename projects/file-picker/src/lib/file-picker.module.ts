import { FilePreviewItemComponent } from './file-preview-container/file-preview-item/file-preview-item.component';
import { FilePreviewContainerComponent } from './file-preview-container/file-preview-container.component';
import { NgModule } from '@angular/core';
import { FilePickerComponent } from './file-picker.component';
import { CommonModule } from '@angular/common';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { HttpClientModule } from '@angular/common/http';
import { FilePickerService } from './file-picker.service';
import { FileDropModule } from './file-drop/file-drop.module';
@NgModule({
  imports: [
    CommonModule,
    FileDropModule,
    AngularCropperjsModule,
    HttpClientModule
  ],
  declarations: [
    FilePickerComponent,
    FilePreviewContainerComponent,
    FilePreviewItemComponent
  ],
  exports: [FilePickerComponent],
  providers: [FilePickerService]
})
export class FilePickerModule {}
