import { NgModule } from '@angular/core';
import { PatchFormDirective } from './patch-form.directive';
import { CheckErrorDirective } from './check-error.directive';
import { FormUtilsComponent } from './form-utils.component';

@NgModule({
   imports: [],
   declarations: [
      FormUtilsComponent,
      PatchFormDirective,
      CheckErrorDirective
   ],
   exports: [
      FormUtilsComponent,
      PatchFormDirective,
      CheckErrorDirective
   ]
})
export class FormUtilsModule { }
