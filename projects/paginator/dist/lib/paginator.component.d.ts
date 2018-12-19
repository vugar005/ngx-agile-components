import { OnInit, EventEmitter } from '@angular/core';
export declare class PaginatorComponent implements OnInit {
    length: number;
    pageSize: number;
    page: EventEmitter<{}>;
    pageIndex: number;
    private _length;
    private _pageSize;
    constructor();
    ngOnInit(): void;
    readonly label: string;
    getRangeLabel(pageIndex: number, pageSize: number, length: number): string;
    onSelect(e: any): void;
    /** Whether there is a previous page. */
    hasPreviousPage(): boolean;
    /** Whether there is a next page. */
    hasNextPage(): boolean;
    /** Calculate the number of pages */
    getNumberOfPages(): number;
    /** Advances to the next page if it exists. */
    nextPage(): void;
    /** Move back to the previous page if it exists. */
    previousPage(): void;
    private _emitPageEvent;
    _changePageSize(pageSize: number): void;
}
