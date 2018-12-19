import { Injectable, NgModule, Component, Input, Output, EventEmitter, defineInjectable } from '@angular/core';
import { NgxDropdownModule } from 'ngx-simple-dropdown';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PaginatorService = /** @class */ (function () {
    function PaginatorService() {
    }
    PaginatorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    PaginatorService.ctorParameters = function () { return []; };
    /** @nocollapse */ PaginatorService.ngInjectableDef = defineInjectable({ factory: function PaginatorService_Factory() { return new PaginatorService(); }, token: PaginatorService, providedIn: "root" });
    return PaginatorService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxPaginatorModule = /** @class */ (function () {
    function NgxPaginatorModule() {
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
    return NgxPaginatorModule;
}());

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