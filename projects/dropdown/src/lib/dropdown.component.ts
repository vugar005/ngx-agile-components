import { DropdownService } from './dropdown.service';
import { Component, ElementRef, Renderer, ViewEncapsulation,
   AfterContentInit, HostBinding, Output, EventEmitter, Input} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TOGGLE_STATUS } from './toggle-status';

@Component({
  selector: 'ngx-simple-dropdown',
  template: `
  <ng-content select="[dropdownToggle]" class="dew"> </ng-content>
      <ng-content > </ng-content>
  `,
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DropdownService]
})
export class NgxDropdownComponent  implements AfterContentInit {
  @HostBinding('class') classes = 'ngx-dropdown';
  @Output() closed = new EventEmitter();
  @Output() opened = new EventEmitter();
  @Input() positinY: string;
 public status: TOGGLE_STATUS = TOGGLE_STATUS.CLOSE;
  private status$: Subject<TOGGLE_STATUS> = new Subject<TOGGLE_STATUS>();
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
  ) { }
  ngAfterContentInit() {
  }

  setActive(active = true): void {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'active', active);
  }

  toggle(): void {
    if (this.status === TOGGLE_STATUS.OPEN) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'open', true);
    if (this.status !== TOGGLE_STATUS.OPEN) {
      this.status$.next(TOGGLE_STATUS.OPEN);
    }
    this.status = TOGGLE_STATUS.OPEN;
    this.opened.next();
  }

  close(): void {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'open', false);
    if (this.status !== TOGGLE_STATUS.CLOSE) {
    setTimeout(() =>  this.status$.next(TOGGLE_STATUS.CLOSE), 50);
    }
    this.status = TOGGLE_STATUS.CLOSE;
    this.closed.next();
  }

  statusChange(): Observable<TOGGLE_STATUS> {
    return this.status$.asObservable();
  }

}
