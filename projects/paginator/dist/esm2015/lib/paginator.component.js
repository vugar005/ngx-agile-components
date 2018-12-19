/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class PaginatorComponent {
    constructor() {
        this.page = new EventEmitter();
        this.pageIndex = 0;
    }
    /**
     * @return {?}
     */
    get length() { return this._length; }
    /**
     * @param {?} value
     * @return {?}
     */
    set length(value) { this._length = +value; }
    /**
     * @return {?}
     */
    get pageSize() { return this._pageSize; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pageSize(value) { this._pageSize = +value; }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    get label() { return this.getRangeLabel(this.pageIndex, this._pageSize, this._length); }
    /**
     * @param {?} pageIndex
     * @param {?} pageSize
     * @param {?} length
     * @return {?}
     */
    getRangeLabel(pageIndex, pageSize, length) {
        if (length === 0 || pageSize === 0) {
            return `0 of ${length}`;
        }
        length = Math.max(length, 0);
        /** @type {?} */
        const startIndex = pageIndex * pageSize;
        /** @type {?} */
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} of ${length}`;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onSelect(e) { console.log(e); }
    /**
     * Whether there is a previous page.
     * @return {?}
     */
    hasPreviousPage() {
        return this.pageIndex >= 1 && this.pageSize !== 0;
    }
    /**
     * Whether there is a next page.
     * @return {?}
     */
    hasNextPage() {
        /** @type {?} */
        const numberOfPages = this.getNumberOfPages();
        return this.pageIndex < numberOfPages && this.pageSize !== 0;
    }
    /**
     * Calculate the number of pages
     * @return {?}
     */
    getNumberOfPages() {
        return Math.ceil(this.length / this.pageSize) - 1;
    }
    /**
     * Advances to the next page if it exists.
     * @return {?}
     */
    nextPage() {
        if (!this.hasNextPage()) {
            return;
        }
        /** @type {?} */
        const previousPageIndex = this.pageIndex;
        this.pageIndex++;
        this._emitPageEvent(previousPageIndex);
    }
    /**
     * Move back to the previous page if it exists.
     * @return {?}
     */
    previousPage() {
        if (!this.hasPreviousPage()) {
            return;
        }
        /** @type {?} */
        const previousPageIndex = this.pageIndex;
        this.pageIndex--;
        this._emitPageEvent(previousPageIndex);
    }
    /**
     * @param {?} previousPageIndex
     * @return {?}
     */
    _emitPageEvent(previousPageIndex) {
        this.page.emit({
            previousPageIndex,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.length
        });
    }
    /**
     * @param {?} pageSize
     * @return {?}
     */
    _changePageSize(pageSize) {
        /** @type {?} */
        const startIndex = this.pageIndex * this.pageSize;
        /** @type {?} */
        const previousPageIndex = this.pageIndex;
        this.pageIndex = Math.floor(startIndex / pageSize) || 0;
        this.pageSize = pageSize;
        this._emitPageEvent(previousPageIndex);
    }
}
PaginatorComponent.decorators = [
    { type: Component, args: [{
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
         <button [disabled]="!hasPreviousPage()" (click)="previousPage()">
          <svg class="ngx-paginator-icon left" focusable="false" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="rgba(0, 0, 0, 0.54)"></path></svg>
         </button>
         <button [disabled]="!hasNextPage()" (click)="nextPage()">
          <svg class="ngx-paginator-icon right" focusable="false" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="rgba(0, 0, 0, 0.54)"></path></svg>
         </button>
        </div>
     </div>
  </div>
  `,
                styles: [":host{display:block}.ngx-paginator-container{display:flex;align-items:center;justify-content:flex-end;min-height:56px;padding:0 8px;color:rgba(0,0,0,.54)}.ngx-paginator-container .ngx-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}.ngx-paginator-container .ngx-paginator-range-actions{display:flex;align-items:center}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-label{font-size:12px;margin:0 32px 0 24px}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-actions-btns{display:flex}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-actions-btns button{background:0 0;border:0;outline:0}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-actions-btns button svg.ngx-paginator-icon{width:28px;cursor:pointer}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-actions-btns button .ngx-paginator-icon.right{-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg)}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-actions-btns button:disabled svg.ngx-paginator-icon path{fill:#c1c1c1}"]
            }] }
];
/** @nocollapse */
PaginatorComponent.ctorParameters = () => [];
PaginatorComponent.propDecorators = {
    length: [{ type: Input }],
    pageSize: [{ type: Input }],
    page: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    PaginatorComponent.prototype.page;
    /** @type {?} */
    PaginatorComponent.prototype.pageIndex;
    /** @type {?} */
    PaginatorComponent.prototype._length;
    /** @type {?} */
    PaginatorComponent.prototype._pageSize;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BhZ2luYXRvci8iLCJzb3VyY2VzIjpbImxpYi9wYWdpbmF0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBcUMvRSxNQUFNO0lBU0o7b0JBSmlCLElBQUksWUFBWSxFQUFFO3lCQUN2QixDQUFDO0tBR0k7Ozs7SUFSakIsSUFBYyxNQUFNLEtBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Ozs7O0lBQ3BDLElBQUksTUFBTSxDQUFDLEtBQWEsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFFLEVBQUU7Ozs7SUFDL0QsSUFBYyxRQUFRLEtBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Ozs7O0lBQ3hDLElBQUksUUFBUSxDQUFDLEtBQWEsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Ozs7SUFPbEUsUUFBUTtLQUNQOzs7O0lBQ0QsSUFBSSxLQUFLLEtBQUksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTs7Ozs7OztJQUN2RixhQUFhLENBQUUsU0FBaUIsRUFBRSxRQUFnQixFQUFFLE1BQWM7UUFDaEUsSUFBSSxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsS0FBSyxDQUFDLEVBQUU7WUFBRSxPQUFPLFFBQVEsTUFBTSxFQUFFLENBQUM7U0FBRTtRQUVoRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBRTdCLE1BQU0sVUFBVSxHQUFHLFNBQVMsR0FBRyxRQUFRLENBQUM7O1FBR3hDLE1BQU0sUUFBUSxHQUFHLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBRTFCLE9BQU8sR0FBRyxVQUFVLEdBQUcsQ0FBQyxNQUFNLFFBQVEsT0FBTyxNQUFNLEVBQUUsQ0FBQztLQUN2RDs7Ozs7SUFDRCxRQUFRLENBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBQzs7Ozs7SUFFMUIsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBRUQsV0FBVzs7UUFDVCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDO0tBQzlEOzs7OztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBRUgsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFBRSxPQUFPO1NBQUU7O1FBRXBDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ3hDOzs7OztJQUdELFlBQVk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQUUsT0FBTztTQUFFOztRQUV4QyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQUN4Qzs7Ozs7SUFDTyxjQUFjLENBQUMsaUJBQXlCO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2IsaUJBQWlCO1lBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQzs7Ozs7O0lBRUwsZUFBZSxDQUFDLFFBQWdCOztRQUc5QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7O1FBQ2xELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUV6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDeEM7OztZQS9HRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7O2FBRUY7Ozs7O3FCQUVFLEtBQUs7dUJBRUwsS0FBSzttQkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtc2ltcGxlLXBhZ2luYXRvcicsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgY2xhc3M9XCJuZ3gtcGFnaW5hdG9yLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5neC1wYWdpbmF0b3ItcGFnZS1zaXplXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtcGFnaW5hdG9yLXBhZ2Utc2l6ZS1sYWJlbFwiPiBJdGVtcyBwZXIgcGFnZTpcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtcGFnaW5hdG9yLXJhbmdlLWFjdGlvbnNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC1wYWdpbmF0b3ItcmFuZ2UtbGFiZWxcIj4ge3tsYWJlbH19PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtZHJvcGRvd24td3JhcHBlclwiIHN0eWxlPVwid2lkdGg6IDJyZW07IGZvbnQtc2l6ZTogMTJweDtcIj5cbiAgICAgICAgPG5neC1zaW1wbGUtZHJvcGRvd24gW3Bvc2l0aW5ZXT1cIidhYm92ZSdcIj5cbiAgICAgICAgICA8cCAgZHJvcGRvd25Ub2dnbGU+e3twYWdlU2l6ZX19PC9wPlxuICAgICAgICAgIDx1bCAqZHJvcGRvd25NZW51IGNsYXNzPVwibmd4LWRyb3Bkb3duLW1lbnVcIj5cbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cIl9jaGFuZ2VQYWdlU2l6ZSgyKVwiPjI8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cIl9jaGFuZ2VQYWdlU2l6ZSgyNSlcIj4yNTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiX2NoYW5nZVBhZ2VTaXplKDEwMClcIj4xMDA8L2J1dHRvbj5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L25neC1zaW1wbGUtZHJvcGRvd24+XG4gICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC1wYWdpbmF0b3ItcmFuZ2UtYWN0aW9ucy1idG5zXCI+XG4gICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCIhaGFzUHJldmlvdXNQYWdlKClcIiAoY2xpY2spPVwicHJldmlvdXNQYWdlKClcIj5cbiAgICAgICAgICA8c3ZnIGNsYXNzPVwibmd4LXBhZ2luYXRvci1pY29uIGxlZnRcIiBmb2N1c2FibGU9XCJmYWxzZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTE1LjQxIDcuNDFMMTQgNmwtNiA2IDYgNiAxLjQxLTEuNDFMMTAuODMgMTJ6XCIgZmlsbD1cInJnYmEoMCwgMCwgMCwgMC41NClcIj48L3BhdGg+PC9zdmc+XG4gICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgIDxidXR0b24gW2Rpc2FibGVkXT1cIiFoYXNOZXh0UGFnZSgpXCIgKGNsaWNrKT1cIm5leHRQYWdlKClcIj5cbiAgICAgICAgICA8c3ZnIGNsYXNzPVwibmd4LXBhZ2luYXRvci1pY29uIHJpZ2h0XCIgZm9jdXNhYmxlPVwiZmFsc2VcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0xNS40MSA3LjQxTDE0IDZsLTYgNiA2IDYgMS40MS0xLjQxTDEwLjgzIDEyelwiIGZpbGw9XCJyZ2JhKDAsIDAsIDAsIDAuNTQpXCI+PC9wYXRoPjwvc3ZnPlxuICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL3BhZ2luYXRvci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpICBnZXQgbGVuZ3RoKCkge3JldHVybiB0aGlzLl9sZW5ndGg7IH1cbiAgICAgICAgICAgIHNldCBsZW5ndGgodmFsdWU6IG51bWJlcikgeyB0aGlzLl9sZW5ndGggPSArdmFsdWUgOyB9XG4gIEBJbnB1dCgpICBnZXQgcGFnZVNpemUoKSB7cmV0dXJuIHRoaXMuX3BhZ2VTaXplOyB9XG4gICAgICAgICAgICBzZXQgcGFnZVNpemUodmFsdWU6IG51bWJlcikgeyB0aGlzLl9wYWdlU2l6ZSA9ICt2YWx1ZTsgfVxuICBAT3V0cHV0KCkgcGFnZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcGFnZUluZGV4ID0gMDtcbiAgcHJpdmF0ZSBfbGVuZ3RoOiBudW1iZXI7XG4gIHByaXZhdGUgX3BhZ2VTaXplOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbiAgZ2V0IGxhYmVsKCkge3JldHVybiB0aGlzLmdldFJhbmdlTGFiZWwodGhpcy5wYWdlSW5kZXgsIHRoaXMuX3BhZ2VTaXplLCB0aGlzLl9sZW5ndGgpOyB9XG4gIGdldFJhbmdlTGFiZWwgKHBhZ2VJbmRleDogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyLCBsZW5ndGg6IG51bWJlcikgIHtcbiAgICBpZiAobGVuZ3RoID09PSAwIHx8IHBhZ2VTaXplID09PSAwKSB7IHJldHVybiBgMCBvZiAke2xlbmd0aH1gOyB9XG5cbiAgICBsZW5ndGggPSBNYXRoLm1heChsZW5ndGgsIDApO1xuXG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHBhZ2VJbmRleCAqIHBhZ2VTaXplO1xuXG4gICAgLy8gSWYgdGhlIHN0YXJ0IGluZGV4IGV4Y2VlZHMgdGhlIGxpc3QgbGVuZ3RoLCBkbyBub3QgdHJ5IGFuZCBmaXggdGhlIGVuZCBpbmRleCB0byB0aGUgZW5kLlxuICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCA8IGxlbmd0aCA/XG4gICAgICAgIE1hdGgubWluKHN0YXJ0SW5kZXggKyBwYWdlU2l6ZSwgbGVuZ3RoKSA6XG4gICAgICAgIHN0YXJ0SW5kZXggKyBwYWdlU2l6ZTtcblxuICAgIHJldHVybiBgJHtzdGFydEluZGV4ICsgMX0gLSAke2VuZEluZGV4fSBvZiAke2xlbmd0aH1gO1xuICB9XG4gIG9uU2VsZWN0KGUpIHtjb25zb2xlLmxvZyhlKX1cbiAgICAvKiogV2hldGhlciB0aGVyZSBpcyBhIHByZXZpb3VzIHBhZ2UuICovXG4gICAgaGFzUHJldmlvdXNQYWdlKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMucGFnZUluZGV4ID49IDEgJiYgdGhpcy5wYWdlU2l6ZSAhPT0gMDtcbiAgICB9XG4gICAgLyoqIFdoZXRoZXIgdGhlcmUgaXMgYSBuZXh0IHBhZ2UuICovXG4gICAgaGFzTmV4dFBhZ2UoKTogYm9vbGVhbiB7XG4gICAgICBjb25zdCBudW1iZXJPZlBhZ2VzID0gdGhpcy5nZXROdW1iZXJPZlBhZ2VzKCk7XG4gICAgICByZXR1cm4gdGhpcy5wYWdlSW5kZXggPCBudW1iZXJPZlBhZ2VzICYmIHRoaXMucGFnZVNpemUgIT09IDA7XG4gICAgfVxuICAgICAvKiogQ2FsY3VsYXRlIHRoZSBudW1iZXIgb2YgcGFnZXMgKi9cbiAgICBnZXROdW1iZXJPZlBhZ2VzKCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMubGVuZ3RoIC8gdGhpcy5wYWdlU2l6ZSkgLSAxO1xuICAgIH1cbiAgICAgIC8qKiBBZHZhbmNlcyB0byB0aGUgbmV4dCBwYWdlIGlmIGl0IGV4aXN0cy4gKi9cbiAgbmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhhc05leHRQYWdlKCkpIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCBwcmV2aW91c1BhZ2VJbmRleCA9IHRoaXMucGFnZUluZGV4O1xuICAgIHRoaXMucGFnZUluZGV4Kys7XG4gICAgdGhpcy5fZW1pdFBhZ2VFdmVudChwcmV2aW91c1BhZ2VJbmRleCk7XG4gIH1cblxuICAvKiogTW92ZSBiYWNrIHRvIHRoZSBwcmV2aW91cyBwYWdlIGlmIGl0IGV4aXN0cy4gKi9cbiAgcHJldmlvdXNQYWdlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNQcmV2aW91c1BhZ2UoKSkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IHByZXZpb3VzUGFnZUluZGV4ID0gdGhpcy5wYWdlSW5kZXg7XG4gICAgdGhpcy5wYWdlSW5kZXgtLTtcbiAgICB0aGlzLl9lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUluZGV4KTtcbiAgfVxuIHByaXZhdGUgIF9lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnBhZ2UuZW1pdCh7XG4gICAgICBwcmV2aW91c1BhZ2VJbmRleCxcbiAgICAgIHBhZ2VJbmRleDogdGhpcy5wYWdlSW5kZXgsXG4gICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgIGxlbmd0aDogdGhpcy5sZW5ndGhcbiAgICB9KTtcbiAgfVxuICBfY2hhbmdlUGFnZVNpemUocGFnZVNpemU6IG51bWJlcikge1xuICAgIC8vIEN1cnJlbnQgcGFnZSBuZWVkcyB0byBiZSB1cGRhdGVkIHRvIHJlZmxlY3QgdGhlIG5ldyBwYWdlIHNpemUuIE5hdmlnYXRlIHRvIHRoZSBwYWdlXG4gICAgLy8gY29udGFpbmluZyB0aGUgcHJldmlvdXMgcGFnZSdzIGZpcnN0IGl0ZW0uXG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMucGFnZUluZGV4ICogdGhpcy5wYWdlU2l6ZTtcbiAgICBjb25zdCBwcmV2aW91c1BhZ2VJbmRleCA9IHRoaXMucGFnZUluZGV4O1xuXG4gICAgdGhpcy5wYWdlSW5kZXggPSBNYXRoLmZsb29yKHN0YXJ0SW5kZXggLyBwYWdlU2l6ZSkgfHwgMDtcbiAgICB0aGlzLnBhZ2VTaXplID0gcGFnZVNpemU7XG4gICAgdGhpcy5fZW1pdFBhZ2VFdmVudChwcmV2aW91c1BhZ2VJbmRleCk7XG4gIH1cbn1cbiJdfQ==