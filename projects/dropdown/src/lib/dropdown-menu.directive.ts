import { NgxDropdownComponent } from './dropdown.component';
import { takeUntil } from 'rxjs/operators/';
import { Directive, ElementRef, Host, OnInit, OnDestroy, TemplateRef, ViewContainerRef, HostBinding, AfterViewInit} from '@angular/core';

import { TOGGLE_STATUS } from './toggle-status';
import { Subject } from 'rxjs';

@Directive({
  selector: '[dropdownMenu]',
  exportAs: 'dropdownMenu',
})
export class DropdownMenuDirective implements OnInit, OnDestroy , AfterViewInit {
  ngUnsubscribe: Subject<void> = new Subject<void>();
  @HostBinding('class') classes = 'ngx-dropdown-menu';
  clickListener = this.onDocumentClick.bind(this);
  constructor(
    @Host() public dropdown: NgxDropdownComponent,
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }
 ngAfterViewInit() {

 }
  ngOnInit() {
    this.dropdown.statusChange()
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe((newStatus: TOGGLE_STATUS) => {
      if (newStatus === TOGGLE_STATUS.OPEN) {
        // Listen to click events to realise when to close the dropdown.
       document.addEventListener('click', this.clickListener, true);
        this.viewContainer.createEmbeddedView(this.templateRef)

      } else {
       document.removeEventListener('click', this.clickListener, true);
      this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    document.removeEventListener('click', this.clickListener, true);
  }

  onDocumentClick(event: MouseEvent) {
    const target: EventTarget = event.target;
    if (target instanceof HTMLElement && target.hasAttribute('dropdownToggle')) {
      // Ignore dropdownToggle element, even if it's outside the menu.
      return;
    }
    const isInsideClick = this.elementRef.nativeElement.contains(target);
    if (!isInsideClick || target instanceof HTMLElement && target.tagName === 'BUTTON') {
      this.dropdown.close();
    } else {
   //   this.dropdown.open();
    }
  }
}
