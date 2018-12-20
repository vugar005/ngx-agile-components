import { NgModule } from '@angular/core';
import { PaginatorComponent } from './paginator.component';
// import { NgxDropdownModule } from 'ngx-simple-dropdown';
 import { NgxDropdownModule } from 'projects/dropdown/src/lib/dropdown.module';

@NgModule({
  imports: [
    NgxDropdownModule
  ],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent]
})
export class NgxPaginatorModule { }
