import { NgModule } from '@angular/core';
import { PaginatorComponent } from './paginator.component';
import { NgxDropdownModule } from '../dropdown/dropdown.module';
// import { NgxDropdownModule } from 'ngx-simple-dropdown';

@NgModule({
  imports: [
    NgxDropdownModule
  ],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent]
})
export class NgxPaginatorModule { }
