import { NgxDropdownComponent } from './dropdown.component';
import { Directive, Host, HostListener, OnInit,  HostBinding } from '@angular/core';

@Directive({
  selector: '[dropdownToggle]',
  exportAs: 'dropdownToggle',
})
export class DropdownToggleDirective implements OnInit {
 @HostBinding('class') classes = 'ngx-dropdown-toggle';
  constructor(@Host() public dropdown: NgxDropdownComponent) { }
  ngOnInit() {
  }
  @HostListener('click')
  toggle() {
    this.dropdown.toggle();
  }
}
