import { Directive, HostListener, HostBinding, Input } from '@angular/core';
import { CheckboxStatus } from './checkbox-status';

@Directive({
  selector: '[rowCheckbox]'
})
export class RowCheckboxDirective {
  @Input() data: any;
  checkBoxStatus = CheckboxStatus.unchecked;
  @HostBinding('class') get classList() {return this.getClass(); }
  @HostListener('click') onClick(): void {this.toggleCheckbox(); }
  constructor() { }
  getClass(): string {
    switch (this.checkBoxStatus) {
      case CheckboxStatus.unchecked:
      return 'unchecked';
      case CheckboxStatus.indeterminate:
      return 'indeterminate';
      case CheckboxStatus.checked:
      return 'checked';
      default:
      return '';
  }
}
toggleCheckbox(): void {
  const target = event.target as HTMLElement;
  if (!target.className.includes('ngx-native-checkmark-cell')) {return; }
 if (this.checkBoxStatus === CheckboxStatus.unchecked) {
    this.checkBoxStatus = CheckboxStatus.checked;
    return;
 } else {
   this.checkBoxStatus = CheckboxStatus.unchecked;
 }
}
}
