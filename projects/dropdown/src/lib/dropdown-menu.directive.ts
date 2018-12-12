import { NgxDropdownComponent } from './dropdown.component';
import { TOGGLE_STATUS } from './toggle-status';
import { Directive, OnInit, OnDestroy, Host, ElementRef, HostBinding, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Directive({
  selector: '[dropdownMenu]',
  exportAs: 'dropdownMenu'
})
export class DropdownMenuDirective implements OnInit, OnDestroy {
 @HostBinding('class') classes = 'ngx-dropdown-menu';
  _onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    @Host() public dropdown: NgxDropdownComponent,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    console.log(this.elementRef)
    this.dropdown.statusChange()
    .pipe(
      takeUntil(this._onDestroy$)
    )
      .subscribe((newStatus: TOGGLE_STATUS) => {
        if (newStatus === TOGGLE_STATUS.OPEN) {
          console.log('open')
          // Listen to click events to realise when to close the dropdown.
          document.addEventListener('click', this.onDocumentClick.bind(this), true);
        } else {
          document.removeEventListener('click', this.onDocumentClick, true);
        }
      });
  }

  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();

    document.removeEventListener('click', this.onDocumentClick, true);
  }

  onDocumentClick(event: MouseEvent) {
    const target: EventTarget = event.target;
    if (target instanceof HTMLElement && target.hasAttribute('dropdownToggle')) {
      // Ignore dropdownToggle element, even if it's outside the menu.
      return;
    }
    const isInsideClick = this.elementRef.nativeElement.contains(target);
    if (!isInsideClick || target instanceof HTMLElement && target.tagName === 'LI') {
      this.dropdown.close();
    } else {
      this.dropdown.open();
    }
  }

}
