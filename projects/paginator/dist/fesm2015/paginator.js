import { Injectable, Component, Input, Output, EventEmitter, NgModule, defineInjectable } from '@angular/core';
import { NgxDropdownModule } from 'ngx-simple-dropdown';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PaginatorService {
    constructor() { }
}
PaginatorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
PaginatorService.ctorParameters = () => [];
/** @nocollapse */ PaginatorService.ngInjectableDef = defineInjectable({ factory: function PaginatorService_Factory() { return new PaginatorService(); }, token: PaginatorService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PaginatorComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxPaginatorModule {
}
NgxPaginatorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    NgxDropdownModule
                ],
                declarations: [PaginatorComponent],
                exports: [PaginatorComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { PaginatorService, PaginatorComponent, NgxPaginatorModule };

//# sourceMappingURL=paginator.js.map