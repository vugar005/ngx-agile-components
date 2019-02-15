import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowEditerComponent } from './row-editer/row-editer.component';
import { RowInsertDialogComponent } from './row-insert-dialog/row-insert-dialog.component';
import { InsertTableDataDirective } from './insert-table-data.directive';
import { NgxNativeTableComponent } from './native-table.component';
import { UpdateTableDataDirective } from './update-table-data.directive';
import { RowCheckboxDirective } from './row-checkbox.directive';
import { RowsToggleAllCheckboxDirective } from './rows-toggle-all-checkbox.directive';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { TableLoaderOverlayComponent } from './table-loader-overlay/table-loader-overlay.component';
import { TableNoDataOverlayComponent } from './table-no-data-overlay/table-no-data-overlay.component';
import { NgxDropdownModule } from './dropdown/dropdown.module';
import { NgxPaginatorModule } from './paginator/paginator.module';
import { FormsModule } from '@angular/forms';
import { SortIconComponent } from './icons/sort-icon/sort-icon.component';
import { OrderByColumnDirective } from './directives/order-by-column.directive';
// import { NgxPaginatorModule } from 'ngx-simple-paginator';
// import { NgxDropdownModule } from 'ngx-simple-dropdown';



@NgModule({
   imports: [
      CommonModule,
      NgxDropdownModule,
      NgxPaginatorModule,
      FormsModule
   ],
   declarations: [
      NgxNativeTableComponent,
      RowEditerComponent,
      RowInsertDialogComponent,
      InsertTableDataDirective,
      UpdateTableDataDirective,
      RowCheckboxDirective,
      RowsToggleAllCheckboxDirective,
      ConfirmModalComponent,
      TableLoaderOverlayComponent,
      TableNoDataOverlayComponent,
      SortIconComponent,
      OrderByColumnDirective
   ],
   exports: [
      NgxNativeTableComponent,
      InsertTableDataDirective,
      UpdateTableDataDirective
   ]
})
export class NgxNativeTableModule { }
