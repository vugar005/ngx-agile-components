import { UpdateTableDataDirective } from './directives/update-table-data.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertTableDataDirective } from './directives/insert-table-data.directive';
import { PatchFormDirective } from './directives/patch-form.directive';

@NgModule({
   imports: [
      CommonModule
   ],
   declarations: [
      PatchFormDirective,
      InsertTableDataDirective,
      UpdateTableDataDirective
   ],
   exports: [
      PatchFormDirective,
      InsertTableDataDirective,
      UpdateTableDataDirective
   ]
})
export class FormUtilsModule { }
