import { CheckboxStatus } from './checkbox-status';
import { Directive, HostListener, Input, QueryList, AfterViewInit } from '@angular/core';
import { NgxNativeTableComponent } from './native-table.component';

@Directive({
  selector: '[rowsToggleAllCheckbox]'
})
export class RowsToggleAllCheckboxDirective implements AfterViewInit {
  checkBoxStatus: CheckboxStatus;
  @Input() rowCheckboxes: QueryList<any>;
  @HostListener('click') onClick(): void {this.toggleCheckbox(); }
  constructor() { }
  toggleCheckbox(): void {
    if (this.checkBoxStatus === CheckboxStatus.unchecked) {
       this.checkBoxStatus = CheckboxStatus.checked;
       return;
    } else {
      this.checkBoxStatus = CheckboxStatus.unchecked;
    }
   }
   ngAfterViewInit() {
   }
}
