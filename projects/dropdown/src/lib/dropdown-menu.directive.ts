import { NgxDropdownComponent } from './dropdown.component';
import { takeUntil } from 'rxjs/operators';
import {
  Directive,
  ElementRef,
  Host,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  HostBinding,
  AfterViewInit,
} from '@angular/core';

import { TOGGLE_STATUS } from './toggle-status';
import { Subject, fromEvent } from 'rxjs';

@Directive({
  selector: '[dropdownMenu]',
  exportAs: 'dropdownMenu'
})
export class DropdownMenuDirective implements OnInit, OnDestroy, AfterViewInit {
  ngUnsubscribe: Subject<void> = new Subject<void>();
  clickListener = this.onDocumentClick.bind(this);
  @HostBinding('class') classes = 'ngx-dropdown-menu';
  constructor(
    @Host() public dropdown: NgxDropdownComponent,
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  ngAfterViewInit() {
   // fromEvent(window, 'resize').subscribe(res => console.log('rxjs ', res))
  }
  ngOnInit() {
    this.dropdown
      .statusChange()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((newStatus: TOGGLE_STATUS) => {
        if (newStatus === TOGGLE_STATUS.OPEN) {
          // Listen to click events to realise when to close the dropdown.
          document.addEventListener('click', this.clickListener, true);
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.calcMenuPosition();
        } else {
          document.removeEventListener('click', this.clickListener, true);
          this.viewContainer.clear();
        }
      });
  }
  calcMenuPosition(): void {
    const hostEl = document.getElementsByClassName('ngx-dropdown open')[0] as HTMLElement;
    const el = document.getElementsByClassName('ngx-dropdown-menu')[0] as HTMLElement;
    const rect = hostEl.getBoundingClientRect();
    const top = this.dropdown.positinY === 'above' ? rect.top - el.offsetHeight : rect.top;
   // const top = rect.top - hostEl.offsetHeight;
    el.style.top =  `${top}px`;
    el.style.left = `${rect.left}px`;
  }
  getOffset(el): void {
    // let _x = 0;
    // let _y = 0;
    // while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    //   _x += el.offsetLeft - el.scrollLeft;
    //   _y += el.offsetTop - el.scrollTop;
    //   el = el.offsetParent;
    // }
    // return { top: _y, left: _x };
  }
  onWindowResize() {
    console.log('resiz');
    this.calcMenuPosition();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    document.removeEventListener('click', this.clickListener, true);
  }

  onDocumentClick(event: MouseEvent): void {
    const target: EventTarget = event.target;
    if (
      target instanceof HTMLElement &&
      target.hasAttribute('dropdownToggle')
    ) {
      // Ignore dropdownToggle element, even if it's outside the menu.
      this.dropdown.close();
      return;
    }
    const isInsideClick = this.elementRef.nativeElement.contains(target);
    if (
      !isInsideClick ||
      (target instanceof HTMLElement && target.tagName === 'BUTTON')
    ) {
      this.dropdown.close();
    } else {
      //   this.dropdown.open();
    }
  }
}
