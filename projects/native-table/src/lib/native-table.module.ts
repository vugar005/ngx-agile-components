import { NgModule } from '@angular/core';
import { NativeTableComponent } from './native-table.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NativeTableComponent],
  exports: [NativeTableComponent]
})
export class NgxNativeTableModule { }
