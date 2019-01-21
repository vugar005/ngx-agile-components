import { NgModule } from '@angular/core';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { NgxDropdownComponent } from './dropdown.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
   imports: [],
   declarations: [
      NgxDropdownComponent,
      DropdownMenuDirective,
      DropdownToggleDirective,
      DropdownDirective
   ],
   exports: [
      NgxDropdownComponent,
      DropdownMenuDirective,
      DropdownToggleDirective,
      DropdownDirective
   ]
})
export class NgxDropdownModule { }
