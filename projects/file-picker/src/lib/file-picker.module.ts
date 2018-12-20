import {NgModule} from '@angular/core';
import {FilePickerComponent} from './file-picker.component';
import {FileDropModule} from 'ngx-file-drop';
import {CommonModule} from '@angular/common';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { HttpClientModule } from '@angular/common/http';
import { FilePickerService } from './file-picker.service';
@NgModule({
  imports: [
    CommonModule,
    FileDropModule,
    AngularCropperjsModule,
    HttpClientModule
  ],
  declarations: [FilePickerComponent],
  exports: [FilePickerComponent],
  providers: [FilePickerService]
})
export class FilePickerModule {
}
