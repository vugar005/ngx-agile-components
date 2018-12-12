import { DropdownService } from './dropdown.service';
import { Component, ElementRef, Renderer, ViewEncapsulation, AfterContentInit, HostBinding} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TOGGLE_STATUS } from './toggle-status';

@Component({
  selector: 'ngx-dropdown',
  template: `
  <ng-content select="[dropdownToggle]" class="dew"> </ng-content>
   <ng-content select="[dropdownMenu]"> </ng-content>
  `,
  styles: [
  `
 .ngx-dropdown{
    position: relative;
    width: 100%;
    display: block;
  }
   .ngx-dropdown.open .ngx-dropdown-menu {
     opacity: 1;
   }
  .ngx-dropdown-toggle {
    width: 100%;
  }
  .ngx-dropdown-menu {
    display: block;
    opacity: 0;
    position: absolute;
    min-width: 100%;
    transform-origin: top center;
    position: absolute;
    top:2em;
    left: 0;
    z-index: 70;
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
    .ngx-dropdown-menu li {
        color: #333;
        padding: .8rem 1rem;
        cursor: pointer;
        transition: all .2s;
        list-style-type: none;
    }
    .ngx-dropdown-menu li:hover {
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
 public status: TOGGLE_STATUS = TOGGLE_STATUS.CLOSE;
  private status$: Subject<TOGGLE_STATUS> = new Subject<TOGGLE_STATUS>();
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
  ) { }
  ngAfterContentInit() {
  }

  setActive(active = true) {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'active', active);
  }

  toggle() {
    if (this.status === TOGGLE_STATUS.OPEN) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'open', true);
    if (this.status !== TOGGLE_STATUS.OPEN) {
      this.status$.next(TOGGLE_STATUS.OPEN);
    }
    this.status = TOGGLE_STATUS.OPEN;
  }

  close() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'open', false);
    if (this.status !== TOGGLE_STATUS.CLOSE) {
      this.status$.next(TOGGLE_STATUS.CLOSE);
    }
    this.status = TOGGLE_STATUS.CLOSE;
  }

  statusChange(): Observable<TOGGLE_STATUS> {
    return this.status$.asObservable();
  }

}
