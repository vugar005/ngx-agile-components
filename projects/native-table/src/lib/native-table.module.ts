import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowEditerComponent } from './row-editer/row-editer.component';
import { RowInsertDialogComponent } from './row-insert-dialog/row-insert-dialog.component';
import { InsertTableDataDirective } from './insert-table-data.directive';
import { NgxNativeTableComponent } from './native-table.component';
import { UpdateTableDataDirective } from './update-table-data.directive';
import { NgxDropdownModule } from 'projects/dropdown/src/lib/dropdown.module';
import { RowCheckboxDirective } from './row-checkbox.directive';


@NgModule({
   imports: [
      CommonModule,
      NgxDropdownModule
   ],
   declarations: [
      NgxNativeTableComponent,
      RowEditerComponent,
      RowInsertDialogComponent,
      InsertTableDataDirective,
      UpdateTableDataDirective,
      RowCheckboxDirective
   ],
   exports: [
      NgxNativeTableComponent,
      InsertTableDataDirective,
      UpdateTableDataDirective
   ]
})
export class NgxNativeTableModule { }
