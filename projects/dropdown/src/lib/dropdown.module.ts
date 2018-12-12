import { NgModule } from '@angular/core';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { NgxDropdownComponent } from './dropdown.component';

@NgModule({
   imports: [],
   declarations: [
      NgxDropdownComponent,
      DropdownMenuDirective,
      DropdownToggleDirective
   ],
   exports: [
      NgxDropdownComponent,
      DropdownMenuDirective,
      DropdownToggleDirective
   ]
})
export class NgxDropdownModule { }
