/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var PaginatorComponent = /** @class */ (function () {
    function PaginatorComponent() {
        this.page = new EventEmitter();
        this.pageIndex = 0;
    }
    Object.defineProperty(PaginatorComponent.prototype, "length", {
        get: /**
         * @return {?}
         */
        function () { return this._length; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._length = +value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginatorComponent.prototype, "pageSize", {
        get: /**
         * @return {?}
         */
        function () { return this._pageSize; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._pageSize = +value; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PaginatorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    Object.defineProperty(PaginatorComponent.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () { return this.getRangeLabel(this.pageIndex, this._pageSize, this._length); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} pageIndex
     * @param {?} pageSize
     * @param {?} length
     * @return {?}
     */
    PaginatorComponent.prototype.getRangeLabel = /**
     * @param {?} pageIndex
     * @param {?} pageSize
     * @param {?} length
     * @return {?}
     */
    function (pageIndex, pageSize, length) {
        if (length === 0 || pageSize === 0) {
            return "0 of " + length;
        }
        length = Math.max(length, 0);
        /** @type {?} */
        var startIndex = pageIndex * pageSize;
        /** @type {?} */
        var endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return startIndex + 1 + " - " + endIndex + " of " + length;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    PaginatorComponent.prototype.onSelect = /**
     * @param {?} e
     * @return {?}
     */
    function (e) { console.log(e); };
    /** Whether there is a previous page. */
    /**
     * Whether there is a previous page.
     * @return {?}
     */
    PaginatorComponent.prototype.hasPreviousPage = /**
     * Whether there is a previous page.
     * @return {?}
     */
    function () {
        return this.pageIndex >= 1 && this.pageSize !== 0;
    };
    /** Whether there is a next page. */
    /**
     * Whether there is a next page.
     * @return {?}
     */
    PaginatorComponent.prototype.hasNextPage = /**
     * Whether there is a next page.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var numberOfPages = this.getNumberOfPages();
        return this.pageIndex < numberOfPages && this.pageSize !== 0;
    };
    /** Calculate the number of pages */
    /**
     * Calculate the number of pages
     * @return {?}
     */
    PaginatorComponent.prototype.getNumberOfPages = /**
     * Calculate the number of pages
     * @return {?}
     */
    function () {
        return Math.ceil(this.length / this.pageSize) - 1;
    };
    /** Advances to the next page if it exists. */
    /**
     * Advances to the next page if it exists.
     * @return {?}
     */
    PaginatorComponent.prototype.nextPage = /**
     * Advances to the next page if it exists.
     * @return {?}
     */
    function () {
        if (!this.hasNextPage()) {
            return;
        }
        /** @type {?} */
        var previousPageIndex = this.pageIndex;
        this.pageIndex++;
        this._emitPageEvent(previousPageIndex);
    };
    /** Move back to the previous page if it exists. */
    /**
     * Move back to the previous page if it exists.
     * @return {?}
     */
    PaginatorComponent.prototype.previousPage = /**
     * Move back to the previous page if it exists.
     * @return {?}
     */
    function () {
        if (!this.hasPreviousPage()) {
            return;
        }
        /** @type {?} */
        var previousPageIndex = this.pageIndex;
        this.pageIndex--;
        this._emitPageEvent(previousPageIndex);
    };
    /**
     * @param {?} previousPageIndex
     * @return {?}
     */
    PaginatorComponent.prototype._emitPageEvent = /**
     * @param {?} previousPageIndex
     * @return {?}
     */
    function (previousPageIndex) {
        this.page.emit({
            previousPageIndex: previousPageIndex,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            length: this.length
        });
    };
    /**
     * @param {?} pageSize
     * @return {?}
     */
    PaginatorComponent.prototype._changePageSize = /**
     * @param {?} pageSize
     * @return {?}
     */
    function (pageSize) {
        /** @type {?} */
        var startIndex = this.pageIndex * this.pageSize;
        /** @type {?} */
        var previousPageIndex = this.pageIndex;
        this.pageIndex = Math.floor(startIndex / pageSize) || 0;
        this.pageSize = pageSize;
        this._emitPageEvent(previousPageIndex);
    };
    PaginatorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-simple-paginator',
                    template: "\n  <div class=\"ngx-paginator-container\">\n      <div class=\"ngx-paginator-page-size\">\n        <div class=\"ngx-paginator-page-size-label\"> Items per page:\n        </div>\n      </div>\n      <div class=\"ngx-paginator-range-actions\">\n        <div class=\"ngx-paginator-range-label\"> {{label}}</div>\n        <div class=\"ngx-dropdown-wrapper\" style=\"width: 2rem; font-size: 12px;\">\n        <ngx-simple-dropdown [positinY]=\"'above'\">\n          <p  dropdownToggle>{{pageSize}}</p>\n          <ul *dropdownMenu class=\"ngx-dropdown-menu\">\n            <button (click)=\"_changePageSize(2)\">2</button>\n            <button (click)=\"_changePageSize(25)\">25</button>\n            <button (click)=\"_changePageSize(100)\">100</button>\n          </ul>\n        </ngx-simple-dropdown>\n      </div>\n        <div class=\"ngx-paginator-range-actions-btns\">\n         <button [disabled]=\"!hasPreviousPage()\" (click)=\"previousPage()\">\n          <svg class=\"ngx-paginator-icon left\" focusable=\"false\" viewBox=\"0 0 24 24\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\" fill=\"rgba(0, 0, 0, 0.54)\"></path></svg>\n         </button>\n         <button [disabled]=\"!hasNextPage()\" (click)=\"nextPage()\">\n          <svg class=\"ngx-paginator-icon right\" focusable=\"false\" viewBox=\"0 0 24 24\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\" fill=\"rgba(0, 0, 0, 0.54)\"></path></svg>\n         </button>\n        </div>\n     </div>\n  </div>\n  ",
                    styles: [":host{display:block}.ngx-paginator-container{display:flex;align-items:center;justify-content:flex-end;min-height:56px;padding:0 8px;color:rgba(0,0,0,.54)}.ngx-paginator-container .ngx-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}.ngx-paginator-container .ngx-paginator-range-actions{display:flex;align-items:center}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-label{font-size:12px;margin:0 32px 0 24px}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-actions-btns{display:flex}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-actions-btns button{background:0 0;border:0;outline:0}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-actions-btns button svg.ngx-paginator-icon{width:28px;cursor:pointer}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-actions-btns button .ngx-paginator-icon.right{-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg)}.ngx-paginator-container .ngx-paginator-range-actions .ngx-paginator-range-actions-btns button:disabled svg.ngx-paginator-icon path{fill:#c1c1c1}"]
                }] }
    ];
    /** @nocollapse */
    PaginatorComponent.ctorParameters = function () { return []; };
    PaginatorComponent.propDecorators = {
        length: [{ type: Input }],
        pageSize: [{ type: Input }],
        page: [{ type: Output }]
    };
    return PaginatorComponent;
}());
export { PaginatorComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BhZ2luYXRvci8iLCJzb3VyY2VzIjpbImxpYi9wYWdpbmF0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQThDN0U7b0JBSmlCLElBQUksWUFBWSxFQUFFO3lCQUN2QixDQUFDO0tBR0k7SUFSakIsc0JBQWMsc0NBQU07Ozs7UUFBcEIsY0FBd0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Ozs7O1FBQ3BDLFVBQVcsS0FBYSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUUsRUFBRTs7O09BRGpCO0lBRTlDLHNCQUFjLHdDQUFROzs7O1FBQXRCLGNBQTBCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOzs7OztRQUN4QyxVQUFhLEtBQWEsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7OztPQURoQjs7OztJQVFsRCxxQ0FBUTs7O0lBQVI7S0FDQztJQUNELHNCQUFJLHFDQUFLOzs7O1FBQVQsY0FBYSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFOzs7T0FBQTs7Ozs7OztJQUN2RiwwQ0FBYTs7Ozs7O0lBQWIsVUFBZSxTQUFpQixFQUFFLFFBQWdCLEVBQUUsTUFBYztRQUNoRSxJQUFJLE1BQU0sS0FBSyxDQUFDLElBQUksUUFBUSxLQUFLLENBQUMsRUFBRTtZQUFFLE9BQU8sVUFBUSxNQUFRLENBQUM7U0FBRTtRQUVoRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBRTdC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cnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1zaW1wbGUtcGFnaW5hdG9yJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiBjbGFzcz1cIm5neC1wYWdpbmF0b3ItY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXBhZ2luYXRvci1wYWdlLXNpemVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC1wYWdpbmF0b3ItcGFnZS1zaXplLWxhYmVsXCI+IEl0ZW1zIHBlciBwYWdlOlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5neC1wYWdpbmF0b3ItcmFuZ2UtYWN0aW9uc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmd4LXBhZ2luYXRvci1yYW5nZS1sYWJlbFwiPiB7e2xhYmVsfX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC1kcm9wZG93bi13cmFwcGVyXCIgc3R5bGU9XCJ3aWR0aDogMnJlbTsgZm9udC1zaXplOiAxMnB4O1wiPlxuICAgICAgICA8bmd4LXNpbXBsZS1kcm9wZG93biBbcG9zaXRpblldPVwiJ2Fib3ZlJ1wiPlxuICAgICAgICAgIDxwICBkcm9wZG93blRvZ2dsZT57e3BhZ2VTaXplfX08L3A+XG4gICAgICAgICAgPHVsICpkcm9wZG93bk1lbnUgY2xhc3M9XCJuZ3gtZHJvcGRvd24tbWVudVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiX2NoYW5nZVBhZ2VTaXplKDIpXCI+MjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiX2NoYW5nZVBhZ2VTaXplKDI1KVwiPjI1PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJfY2hhbmdlUGFnZVNpemUoMTAwKVwiPjEwMDwvYnV0dG9uPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvbmd4LXNpbXBsZS1kcm9wZG93bj5cbiAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmd4LXBhZ2luYXRvci1yYW5nZS1hY3Rpb25zLWJ0bnNcIj5cbiAgICAgICAgIDxidXR0b24gW2Rpc2FibGVkXT1cIiFoYXNQcmV2aW91c1BhZ2UoKVwiIChjbGljayk9XCJwcmV2aW91c1BhZ2UoKVwiPlxuICAgICAgICAgIDxzdmcgY2xhc3M9XCJuZ3gtcGFnaW5hdG9yLWljb24gbGVmdFwiIGZvY3VzYWJsZT1cImZhbHNlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTUuNDEgNy40MUwxNCA2bC02IDYgNiA2IDEuNDEtMS40MUwxMC44MyAxMnpcIiBmaWxsPVwicmdiYSgwLCAwLCAwLCAwLjU0KVwiPjwvcGF0aD48L3N2Zz5cbiAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgPGJ1dHRvbiBbZGlzYWJsZWRdPVwiIWhhc05leHRQYWdlKClcIiAoY2xpY2spPVwibmV4dFBhZ2UoKVwiPlxuICAgICAgICAgIDxzdmcgY2xhc3M9XCJuZ3gtcGFnaW5hdG9yLWljb24gcmlnaHRcIiBmb2N1c2FibGU9XCJmYWxzZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTE1LjQxIDcuNDFMMTQgNmwtNiA2IDYgNiAxLjQxLTEuNDFMMTAuODMgMTJ6XCIgZmlsbD1cInJnYmEoMCwgMCwgMCwgMC41NClcIj48L3BhdGg+PC9zdmc+XG4gICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vcGFnaW5hdG9yLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgIGdldCBsZW5ndGgoKSB7cmV0dXJuIHRoaXMuX2xlbmd0aDsgfVxuICAgICAgICAgICAgc2V0IGxlbmd0aCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX2xlbmd0aCA9ICt2YWx1ZSA7IH1cbiAgQElucHV0KCkgIGdldCBwYWdlU2l6ZSgpIHtyZXR1cm4gdGhpcy5fcGFnZVNpemU7IH1cbiAgICAgICAgICAgIHNldCBwYWdlU2l6ZSh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX3BhZ2VTaXplID0gK3ZhbHVlOyB9XG4gIEBPdXRwdXQoKSBwYWdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwYWdlSW5kZXggPSAwO1xuICBwcml2YXRlIF9sZW5ndGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfcGFnZVNpemU6IG51bWJlcjtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuICBnZXQgbGFiZWwoKSB7cmV0dXJuIHRoaXMuZ2V0UmFuZ2VMYWJlbCh0aGlzLnBhZ2VJbmRleCwgdGhpcy5fcGFnZVNpemUsIHRoaXMuX2xlbmd0aCk7IH1cbiAgZ2V0UmFuZ2VMYWJlbCAocGFnZUluZGV4OiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKSAge1xuICAgIGlmIChsZW5ndGggPT09IDAgfHwgcGFnZVNpemUgPT09IDApIHsgcmV0dXJuIGAwIG9mICR7bGVuZ3RofWA7IH1cblxuICAgIGxlbmd0aCA9IE1hdGgubWF4KGxlbmd0aCwgMCk7XG5cbiAgICBjb25zdCBzdGFydEluZGV4ID0gcGFnZUluZGV4ICogcGFnZVNpemU7XG5cbiAgICAvLyBJZiB0aGUgc3RhcnQgaW5kZXggZXhjZWVkcyB0aGUgbGlzdCBsZW5ndGgsIGRvIG5vdCB0cnkgYW5kIGZpeCB0aGUgZW5kIGluZGV4IHRvIHRoZSBlbmQuXG4gICAgY29uc3QgZW5kSW5kZXggPSBzdGFydEluZGV4IDwgbGVuZ3RoID9cbiAgICAgICAgTWF0aC5taW4oc3RhcnRJbmRleCArIHBhZ2VTaXplLCBsZW5ndGgpIDpcbiAgICAgICAgc3RhcnRJbmRleCArIHBhZ2VTaXplO1xuXG4gICAgcmV0dXJuIGAke3N0YXJ0SW5kZXggKyAxfSAtICR7ZW5kSW5kZXh9IG9mICR7bGVuZ3RofWA7XG4gIH1cbiAgb25TZWxlY3QoZSkge2NvbnNvbGUubG9nKGUpfVxuICAgIC8qKiBXaGV0aGVyIHRoZXJlIGlzIGEgcHJldmlvdXMgcGFnZS4gKi9cbiAgICBoYXNQcmV2aW91c1BhZ2UoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5wYWdlSW5kZXggPj0gMSAmJiB0aGlzLnBhZ2VTaXplICE9PSAwO1xuICAgIH1cbiAgICAvKiogV2hldGhlciB0aGVyZSBpcyBhIG5leHQgcGFnZS4gKi9cbiAgICBoYXNOZXh0UGFnZSgpOiBib29sZWFuIHtcbiAgICAgIGNvbnN0IG51bWJlck9mUGFnZXMgPSB0aGlzLmdldE51bWJlck9mUGFnZXMoKTtcbiAgICAgIHJldHVybiB0aGlzLnBhZ2VJbmRleCA8IG51bWJlck9mUGFnZXMgJiYgdGhpcy5wYWdlU2l6ZSAhPT0gMDtcbiAgICB9XG4gICAgIC8qKiBDYWxjdWxhdGUgdGhlIG51bWJlciBvZiBwYWdlcyAqL1xuICAgIGdldE51bWJlck9mUGFnZXMoKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5sZW5ndGggLyB0aGlzLnBhZ2VTaXplKSAtIDE7XG4gICAgfVxuICAgICAgLyoqIEFkdmFuY2VzIHRvIHRoZSBuZXh0IHBhZ2UgaWYgaXQgZXhpc3RzLiAqL1xuICBuZXh0UGFnZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzTmV4dFBhZ2UoKSkgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IHByZXZpb3VzUGFnZUluZGV4ID0gdGhpcy5wYWdlSW5kZXg7XG4gICAgdGhpcy5wYWdlSW5kZXgrKztcbiAgICB0aGlzLl9lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUluZGV4KTtcbiAgfVxuXG4gIC8qKiBNb3ZlIGJhY2sgdG8gdGhlIHByZXZpb3VzIHBhZ2UgaWYgaXQgZXhpc3RzLiAqL1xuICBwcmV2aW91c1BhZ2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhhc1ByZXZpb3VzUGFnZSgpKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgcHJldmlvdXNQYWdlSW5kZXggPSB0aGlzLnBhZ2VJbmRleDtcbiAgICB0aGlzLnBhZ2VJbmRleC0tO1xuICAgIHRoaXMuX2VtaXRQYWdlRXZlbnQocHJldmlvdXNQYWdlSW5kZXgpO1xuICB9XG4gcHJpdmF0ZSAgX2VtaXRQYWdlRXZlbnQocHJldmlvdXNQYWdlSW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMucGFnZS5lbWl0KHtcbiAgICAgIHByZXZpb3VzUGFnZUluZGV4LFxuICAgICAgcGFnZUluZGV4OiB0aGlzLnBhZ2VJbmRleCxcbiAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgbGVuZ3RoOiB0aGlzLmxlbmd0aFxuICAgIH0pO1xuICB9XG4gIF9jaGFuZ2VQYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKSB7XG4gICAgLy8gQ3VycmVudCBwYWdlIG5lZWRzIHRvIGJlIHVwZGF0ZWQgdG8gcmVmbGVjdCB0aGUgbmV3IHBhZ2Ugc2l6ZS4gTmF2aWdhdGUgdG8gdGhlIHBhZ2VcbiAgICAvLyBjb250YWluaW5nIHRoZSBwcmV2aW91cyBwYWdlJ3MgZmlyc3QgaXRlbS5cbiAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5wYWdlSW5kZXggKiB0aGlzLnBhZ2VTaXplO1xuICAgIGNvbnN0IHByZXZpb3VzUGFnZUluZGV4ID0gdGhpcy5wYWdlSW5kZXg7XG5cbiAgICB0aGlzLnBhZ2VJbmRleCA9IE1hdGguZmxvb3Ioc3RhcnRJbmRleCAvIHBhZ2VTaXplKSB8fCAwO1xuICAgIHRoaXMucGFnZVNpemUgPSBwYWdlU2l6ZTtcbiAgICB0aGlzLl9lbWl0UGFnZUV2ZW50KHByZXZpb3VzUGFnZUluZGV4KTtcbiAgfVxufVxuIl19