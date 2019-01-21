import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-simple-paginator',
  template: `
  <div class="ngx-paginator-container">
      <div class="ngx-paginator-page-size">
        <div class="ngx-paginator-page-size-label"> Items per page:
        </div>
      </div>
      <div class="ngx-paginator-range-actions">
        <div class="ngx-paginator-range-label"> {{label}}</div>
        <div class="ngx-dropdown-wrapper" style="width: 2rem; font-size: 12px;">
        <ngx-simple-dropdown [positinY]="'above'">
          <p  dropdownToggle>{{pageSize}}</p>
          <ul *dropdownMenu class="ngx-dropdown-menu">
            <button (click)="_changePageSize(2)">2</button>
            <button (click)="_changePageSize(25)">25</button>
            <button (click)="_changePageSize(100)">100</button>
          </ul>
        </ngx-simple-dropdown>
      </div>
        <div class="ngx-paginator-range-actions-btns">

        <button  type="button"
        (click)="firstPage()"
        [disabled]="!hasPreviousPage()"
        >
          <svg class="ngx-paginator-icon first" viewBox="0 0 24 24" focusable="false">
          <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" fill="rgba(0, 0, 0, 0.54)"/>
        </svg>
        </button>

         <button [disabled]="!hasPreviousPage()" (click)="previousPage()">
          <svg class="ngx-paginator-icon left" focusable="false" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="rgba(0, 0, 0, 0.54)"></path></svg>
         </button>
         <button [disabled]="!hasNextPage()" (click)="nextPage()">
          <svg class="ngx-paginator-icon right" focusable="false" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="rgba(0, 0, 0, 0.54)"></path></svg>
         </button>
         <button  type="button"
          (click)="lastPage()"
          [disabled]="!hasNextPage()"
          >
            <svg class="ngx-paginator-icon last" viewBox="0 0 24 24" focusable="false">
              <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" fill="rgba(0, 0, 0, 0.54)"/>
            </svg>
          </button>
        </div>
     </div>
  </div>
  `,
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input()  get length() {return this._length; }
            set length(value: number) { this._length = +value ; }
  @Input()  get pageSize() {return this._pageSize; }
            set pageSize(value: number) { this._pageSize = +value; }
  @Output() page = new EventEmitter();
  pageIndex = 0;
  private _length: number;
  private _pageSize: number;
  constructor() { }

  ngOnInit() {
  }
  get label() {return this.getRangeLabel(this.pageIndex, this._pageSize, this._length); }
  getRangeLabel (pageIndex: number, pageSize: number, length: number)  {
    if (length === 0 || pageSize === 0) { return `0 of ${length}`; }

    length = Math.max(length, 0);

    const startIndex = pageIndex * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} of ${length}`;
  }
  onSelect(e) {console.log(e)}
    /** Whether there is a previous page. */
    hasPreviousPage(): boolean {
      return this.pageIndex >= 1 && this.pageSize !== 0;
    }
    /** Whether there is a next page. */
    hasNextPage(): boolean {
      const numberOfPages = this.getNumberOfPages();
      return this.pageIndex < numberOfPages && this.pageSize !== 0;
    }
     /** Calculate the number of pages */
    getNumberOfPages(): number {
      return Math.ceil(this.length / this.pageSize) - 1;
    }
      /** Advances to the next page if it exists. */
  nextPage(): void {
    if (!this.hasNextPage()) { return; }

    const previousPageIndex = this.pageIndex;
    this.pageIndex++;
    this._emitPageEvent(previousPageIndex);
  }

  /** Move back to the previous page if it exists. */
  previousPage(): void {
    if (!this.hasPreviousPage()) { return; }

    const previousPageIndex = this.pageIndex;
    this.pageIndex--;
    this._emitPageEvent(previousPageIndex);
  }
   /** Move to the last page if not already there. */
  lastPage(): void {
    // hasNextPage being false implies at the end
    if (!this.hasNextPage()) { return; }

    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.getNumberOfPages();
    this._emitPageEvent(previousPageIndex);
  }
    /** Move to the first page if not already there. */
    firstPage(): void {
      if (!this.hasPreviousPage()) { return; }
      const previousPageIndex = this.pageIndex;
      this.pageIndex = 0;
      this._emitPageEvent(previousPageIndex);
    }
 private  _emitPageEvent(previousPageIndex: number) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    });
  }
  _changePageSize(pageSize: number) {
    // Current page needs to be updated to reflect the new page size. Navigate to the page
    // containing the previous page's first item.
    const startIndex = this.pageIndex * this.pageSize;
    const previousPageIndex = this.pageIndex;

    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;
    this._emitPageEvent(previousPageIndex);
  }
}
