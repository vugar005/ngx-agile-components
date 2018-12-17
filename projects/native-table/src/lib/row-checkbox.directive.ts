import { Directive, HostListener, HostBinding } from '@angular/core';
import { CheckboxStatus } from './checkbox-status';

@Directive({
  selector: '[rowCheckbox]'
})
export class RowCheckboxDirective {
  checkBoxStatus = CheckboxStatus.unchecked;
  @HostBinding('class') get classList() {return this.getClass(); }
  @HostListener('click', ['$event']) onClick(): void {this.toggleCheckbox(event); }
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
toggleCheckbox(event: Event): void {
  const target = event.target as HTMLElement;
  if (target.className !== 'ngx-native-checkmark-cell') {return; }
 if (this.checkBoxStatus === CheckboxStatus.unchecked) {
    this.checkBoxStatus = CheckboxStatus.checked;
    return;
 } else {
   this.checkBoxStatus = CheckboxStatus.unchecked;
 }
}

}
