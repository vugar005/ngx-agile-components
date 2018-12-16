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
      //   const el = document.getElementsByClassName('ngx-dropdown-menu')[0] as HTMLElement;
       //  const rect = el.getBoundingClientRect();
      //   console.log(rect)
       //  console.log(el.getBoundingClientRect().top)
      //   console.log(el.getBoundingClientRect().right)
    //    el.style.top = `${innerTop - outerTop}px`;
      //  el.style.left = `${rect.left}px`;
       //  console.log(window.scrollT)
      } else {
       document.removeEventListener('click', this.clickListener, true);
      this.viewContainer.clear();
      }
    });
  }
   getOffset( el ) {
    let _x = 0;
    let _y = 0;
    while ( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
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
