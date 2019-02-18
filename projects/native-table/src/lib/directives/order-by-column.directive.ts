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
  @HostListener('click', ['$event']) click(event) { this.onClick(event); }
  @HostListener('mouseover', ['$event']) mouseOver(event) {this.onMouseOver(event); }
  @HostListener('mouseleave', ['$event']) mouseLeave (event) {this.onMouseLeave(event); }
  constructor() { }
  ngAfterViewInit() {
  }
 //    && JSON.stringify(changes['sortState'].previousValue) === JSON.stringify(changes['sortState'].currentValue)
  ngOnChanges(changes: SimpleChanges) {
    if (!(changes && changes['sortState']
   )
      || (changes['sortState'].firstChange)) {return; }
      const sortChangeValue: SortChangeModel = changes['sortState'].currentValue;
        if (sortChangeValue.orderByColumn === this.orderByColumn) {
          this.orderBySort = <SortStates>sortChangeValue.orderBySort;
          this.classes =   <SortStates>sortChangeValue.orderBySort;
         }
  }
  onClick(e): void {
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
         this.emitSortChange();
        break;
    }
  }
  emitSortChange(): void {
    this.sortChange.next({orderByColumn: this.orderByColumn, orderBySort: this.orderBySort});
  }
  onMouseOver(e): void {
    if (this.orderBySort === SortStates.inActive) {
      this.classes = 'hovered';
    }
  }
  onMouseLeave(e): void {
    if (this.orderBySort === SortStates.inActive) {
      this.classes = '';
    }
  }

}
