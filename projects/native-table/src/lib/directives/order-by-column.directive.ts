import { Directive, HostBinding, HostListener, AfterViewInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SortStates } from './sort-states.enum';
import { SortChangeModel } from './sort-change.model';

@Directive({
  selector: '[orderByColumn]',
})
export class OrderByColumnDirective implements AfterViewInit, OnChanges {
  @Input() orderByColumn: string;
  @Input() sortState: string;
  @Output() sortChange = new EventEmitter<SortChangeModel>();
  orderBySort = <string>SortStates.inActive;
  @HostBinding('class') classes = '';
  @HostListener('click', ['$event']) click() { this.onClick(); }
  @HostListener('mouseover', ['$event']) mouseOver() {this.onMouseOver(); }
  @HostListener('mouseleave', ['$event']) mouseLeave () {this.onMouseLeave(); }
  constructor() { }
  ngAfterViewInit() {
  //  setTimeout(() => console.log(this.sortByColumns), 3000)
  }
 //    && JSON.stringify(changes['sortState'].previousValue) === JSON.stringify(changes['sortState'].currentValue)
  ngOnChanges(changes: SimpleChanges) {
    if (!(changes && changes['sortState']
   )
      || (changes['sortState'].firstChange)) {return; }
      const sortChangeValue: SortChangeModel = changes['sortState'].currentValue;
        if (sortChangeValue.orderByColumn === this.orderByColumn) {
          console.log('equal')
          this.orderBySort = <SortStates>sortChangeValue.orderBySort;
          this.classes =   <SortStates>sortChangeValue.orderBySort;
          console.log(this.classes)
         }
  }
  onClick() {
    switch  (this.orderBySort) {
      case SortStates.inActive:
        this.orderBySort = SortStates.asc;
        this.classes = 'asc';
        this.emitSortChange();
        break;
      case SortStates.asc:
         this.orderBySort = SortStates.desc;
       this.classes = 'desc';
         this.emitSortChange();
         break;
      case SortStates.desc:
         this.orderBySort = SortStates.inActive;
         this.classes = '';
        // this.emitSortChange();
        break;
    }
  }
  emitSortChange() {
    this.sortChange.next({orderByColumn: this.orderByColumn, orderBySort: this.orderBySort});
  }
  onMouseOver() {
    if (this.orderBySort === SortStates.inActive) {
      this.classes = 'hovered';
    }
  }
  onMouseLeave() {
    if (this.orderBySort === SortStates.inActive) {
      this.classes = '';
    }
  }

}
