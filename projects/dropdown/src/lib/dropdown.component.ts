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
  styles: [
  `
 .ngx-dropdown{
    position: relative;
    width: 100%;
    display: block;
  }
  .ngx-dropdown-backdrop {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    top:0;
    left: 0;
    background: rgba(0, 0, 0, 0.32);
  }
   .ngx-dropdown.open .ngx-dropdown-menu {
    //  opacity: 1;
     z-index: 101;
   }
  .ngx-dropdown-toggle {
    width: 100%;
    cursor: pointer;
  }
  .ngx-dropdown-menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    opacity: 1;
    position: fixed;
    transform-origin: top center;
    z-index: 100;
    background: #fff;
    transition: .1s;
    box-shadow: 0 2px 6px rgba(0,0,0,.2);
    border-radius: 0 0 2px 2px;
    max-height: 40em;
    overflow-y: auto;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    }
    .ngx-dropdown-menu ul {
    // ul style reset
    }
    .ngx-dropdown-menu button {
        width: 100%;
        text-align: left;
        color: #333;
        padding: .8rem 1rem;
        cursor: pointer;
        transition: all .2s;
        list-style-type: none;
        background: transparent;
        border:0;
        outline: 0;
    }
    .ngx-dropdown-menu button:hover {
      background: #dbdbdb;
    }
  }
  .ngx-dropdown.open .ngx-dropdown-menu {
    opacity: 1;
  }
    `
  ],
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
