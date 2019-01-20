import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CheckboxStatus } from './checkbox-status';
import { ApiConfig } from './api-config.model';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ContentChild,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NativeTableService } from './native-table.service';
import { PageQuery } from './page-query.model';
import { RowCheckboxDirective } from './row-checkbox.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isArray } from 'util';

@Component({
  selector: 'ngx-native-table',
  template: `
    <confirm-modal *ngIf="shConfirmModal" #confirmRef> </confirm-modal>
    <ng-template #loadingOverlay>
      <table-loader-overlay > </table-loader-overlay>
    </ng-template>
    <ng-template #noData>
      <table-no-data-overlay> </table-no-data-overlay>
     </ng-template>
    <ng-container >
      <div class ="ngx-table-element-wrapper" *ngIf="!loading else loadingOverlay">
      <table class="ngx-native-table" *ngIf="rowData && visibleColumnDefs else noData ">
      <colgroup>
        <col *ngFor="let col of visibleColumnDefs">
      </colgroup>
      <thead>
        <th
          *ngIf="enableCheckboxSelection"
          rowsToggleAllCheckbox
          [(rowCheckboxes)]="rowCheckboxes"
          class="data-cell"
        >
        <!-- <div class="ngx-checkmark-container">
            <input type="checkbox" /> <span class="ngx-checkmark"></span>
          </div> -->
        </th>
        <th *ngIf="indexNumber" class="ngx-index-number">#</th>

        <th *ngFor="let col of visibleColumnDefs" [attr.col-key]="col?.i">
          {{ col.n }}
        </th>
        <th *ngIf="editTemplate" class="ngx-native-table-editTemplate">
          Editer
        </th>
      </thead>
      <tbody>
        <tr
          *ngFor="let row of rowData; let i = index"
          [attr.row-id]="row?.id"
          [data]="row"
          rowCheckbox
        >
          <td
            *ngIf="enableCheckboxSelection"
            valign="middle"
            class="ngx-native-checkmark-cell"
          >
            <div class="ngx-checkmark-container">
              <span class="ngx-checkmark"></span>
            </div>
          </td>
          <td *ngIf="indexNumber" class="ngx-index-number">{{ i + 1 }}</td>

          <td
            *ngFor="let col of visibleColumnDefs"
            [attr.col-key]="col?.i"

          >
           <div class="data-cell"> {{ row[col.i] }} </div>
          </td>
          <td
            *ngIf="editTemplate"
            class="ngx-native-table-editTemplate"
            [ngStyle]="{ 'z-index': activeEditMenuIndex === i ? '2' : '0' }"
          >
            <row-editer
              [row]="row"
              [index]="i"
              (open)="activeEditMenuIndex = $event"
            >
              <ng-container *ngTemplateOutlet="editTemplate"> </ng-container>
            </row-editer>
          </td>
        </tr>
      </tbody>
  </table>
  </div>
  <ngx-simple-paginator
  [length] = "rowCount"
  [pageSize]="10"
  (page)="onPageChange($event)"
  > </ngx-simple-paginator>

    </ng-container>

  `,
  styles: [
    `
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
       .ngx-table-element-wrapper {
        width: 100%;
        flex: 1;
        overflow: auto;
       }
      .ngx-native-table {
        display: table;
        table-layout: auto;
        max-width: 100%;
        border-collapse: seperate;
        background: #ffffff;
        border-spacing: 0;
      }
      th.ngx-index-number {
        z-index: 3 !important;
      }
      .ngx-index-number {
        position: sticky;
        left: 0;
        background: #ffffff;
        border-bottom: 1px solid #e0e0e0;
        text-align: center;
      }
      tr.checked {
        background-color: #eee;
      }
      tr.checked td {
        background-color: #eee !important;
      }
      tr.checked .ngx-checkmark:after {
        display: block;
      }
      td.ngx-native-checkmark-cell {
        cursor: pointer;
        border-bottom: 1px solid #e0e0e0;
      }
      td.ngx-native-checkmark-cell > * {
        pointer-events: none;
      }
      .ngx-checkmark-container {
        position: relative;
        cursor: pointer;
        pointer-events: none;
        font-size: 22px;
        height: 25px;
        width: 25px;
      }
      .ngx-checkmark-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      .ngx-checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 19px;
        width: 19px;
        background-color: #ffffff;
        border: 1px solid #eee;
      }
      .ngx-checkmark:after {
        content: '';
        position: absolute;
        display: none;
        left: 7px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid #9B9B9B;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
      .ngx-native-table thead {
        color: rgba(0, 0, 0, 0.54);
      }
      .ngx-native-table th {
        padding: 0.8rem;
        border-bottom: 1px solid #e0e0e0;
        position: sticky;
        top: 0;
        background: #ffffff;
        z-index: 10;
      }
      .ngx-native-table tr {
        transition: background-color 0.1s ease-in-out;
      }
      .ngx-native-table tr:hover {
        background-color: #fafafa;
      }
      .ngx-native-table tr:hover td {
        background-color: #fafafa;
      }
      .ngx-native-table td {
        height: 48px;
        border-bottom: 1px solid #e0e0e0;
      }
      .ngx-native-table td .data-cell {
        padding: 0.7rem;
        text-align: left;
        height: 100%;
      }
      .ngx-native-table th {
        border-bottom: 1px solid #e0e0e0;
      }
      .ngx-native-table th.data-cell {
        padding: 0.7rem;
      }
      .ngx-native-table-editTemplate {
        position: sticky;
        right: 0;
        background: #ffffff;
        border-left: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
      }
    `
  ],
  providers: [NativeTableService]
})
export class NgxNativeTableComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(RowCheckboxDirective) public rowCheckboxes: QueryList<any>;
  @Input() config: ApiConfig;
  @ViewChild(ConfirmModalComponent) confirmRef: ConfirmModalComponent;
  @Input() indexNumber = true;
  @Input() editTemplate: TemplateRef<any>;
  @Input() dialogRef: any;
  @Input() enableCheckboxSelection = true;
  @Output() rowAdd = new EventEmitter();
  @Output() rowEdit = new EventEmitter();
  @Output() rowRemoved = new EventEmitter();
  @Output()
  optClick = new EventEmitter<any>();
  @ContentChild('', { read: ElementRef }) editerComponent: any;
  rowData: any;
  allColumnDefs: any;
  visibleColumnDefs: any;
  hiddenColumnNames: string;
  defaultColumnDefs: any;
  pageLength: number;
  pageQuery: PageQuery = new PageQuery();
  activeEditMenuIndex: string | number;
  _onDestroy$ = new Subject<void>();
  shConfirmModal: boolean;
  loading: boolean;
  rowCount: number;
  constructor(public tableService: NativeTableService) {}

  ngOnInit() {
    this.getTableData(this.pageQuery, true);
    this.listenToGetDataEvent();
  }
  listenToGetDataEvent() {
    this.tableService.getTableData$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(res => {
        if (this.visibleColumnDefs.length > 0) {
          this.getTableData(this.pageQuery, false);
        } else {
          this.getTableData(this.pageQuery, true);
        }
      });
  }
  onPageChange(e) {
    console.log(e.pageIndex)
    this.pageQuery.pageIndex = e.pageIndex;
    this.pageQuery.pageSize = e.pageSize;
    this.getTableData(this.pageQuery);
  }
  ngAfterViewInit() {}
  ngOnDestroy() {
    this._onDestroy$.next();
  }
 get isRowSelected() {
   if (!this.getCheckedRows() ) {return; }
   return this.getCheckedRows().length > 0;
  }
  getCheckedRows() {
    if (!this.rowCheckboxes) {return; }
    const checkedRows = this.rowCheckboxes
      .toArray()
      .filter(
        (row: RowCheckboxDirective) =>
          row.checkBoxStatus === CheckboxStatus.checked
      );
    return checkedRows;
  }
  getTableData(pageQuery: PageQuery, newColumns = false): void {
    this.loading = true;
    this.tableService.getTableData(pageQuery, this.config).subscribe(
      res => {
        this.buildTableData(res, newColumns);
        this.loading = false;
      },
      (er: Error) => {
        console.log(`Error: ${er.message}`);
        this.loading = false;
      },
      () =>  this.loading = false
    );
  }
  buildTableData(res, newColumns): void {
    try {
      if (res && res.tbl[0] && res.tbl[0].c) {
        if (newColumns) {
          this.buildColumns(res);
          this.setColumnsView(res);
           this.rowCount = res.tbl[0].rowCount;
        }
        this.buildRows(res);
      }
    } catch (er) {console.log(er); }
  }
  buildRows(data): void {
    this.pageLength = data.tbl[0].rowCount;
    const rowData = data.tbl[0].r;
    const newRowData = [...rowData].map((row, index) => {
      row.no = index + 1;
      return row;
    });
    this.rowData = newRowData;
  }
  buildColumns(data): void {
    const customSequentialColumndDefs = [];
    const columnDefs = data.tbl[0].c;
    const seqColumns = data.tbl[0].seqColumn.split(',');
    seqColumns.push('actions', 'no');
    seqColumns.forEach(element => {
      columnDefs.forEach((colDef: any) => {
        if (colDef.i === element) {
          customSequentialColumndDefs.push(colDef);
        }
      });
    });
    // const temp = columnDefs.slice(columnDefs.length - 10, columnDefs.length);
    this.allColumnDefs = customSequentialColumndDefs;
  }
  setColumnsView(res): void {
    this.hiddenColumnNames = res.tbl[0].hiddenColumn;
    const defaultColumnNames = res.tbl[0].seqColumn.slice().split(',');
    this.defaultColumnDefs = [...this.allColumnDefs].filter(colDef =>
      defaultColumnNames.includes(colDef.i)
    );
    this.visibleColumnDefs = this.defaultColumnDefs
      .slice()
      .filter(col => !this.hiddenColumnNames.includes(col.i));
      console.log('allCol', this.allColumnDefs)
     console.log('defaultCol', this.defaultColumnDefs)
     console.log('visibCols', this.visibleColumnDefs)
    /** determines which columns to display on table view */
 //   this.toggleColumns(this.visibleColumnDefs);
  }
  toggleColumns() {
   this.visibleColumnDefs = [...this.defaultColumnDefs].
   filter(colDef => this.visibleColumnDefs.map(col => col.n).includes(colDef.n));
  }
  showAllColumns() {
    this.visibleColumnDefs = [...this.defaultColumnDefs];
  }
  hideAllColumns() {
    this.visibleColumnDefs = [];
  }
  addData(): void {
    this.rowAdd.next();
    this.optClick.next('insert');
  }
  onRemove(data) {
    this.shConfirmModal = true;
    setTimeout(
      () =>
        this.confirmRef.closeRef$.subscribe(res => {
          if (res === 'yes') {
            this.removeData(data);
          }
          this.shConfirmModal = false;
        }),
      0
    );
  }
  onRemoveSelected() {
    this.shConfirmModal = true;
    const rows = this.getCheckedRows();
    console.log(rows)
    setTimeout(
      () =>
        this.confirmRef.closeRef$.subscribe(res => {
          if (res === 'yes') {
            this.removeData(rows);
          }
          this.shConfirmModal = false;
        }),
      0
    );
  }
  removeData(data) {
    const dataArray: RowCheckboxDirective[] = [];
    console.log(data);
    if (isArray(data)) {
      dataArray.push(...data);
    } else {
      dataArray.push(data);
    }
    dataArray.forEach((row: RowCheckboxDirective) => {
              this.tableService.removeRow(row.data, this.config).subscribe(
                res => {
                  this.rowRemoved.next(row);
                  this.tableService.getTableData$.next();
      console.log('removeing --', dataArray);
    });
  });
}
onPrint() {
  console.log('on print');
}
onExport() {
  console.log('on export');
}
  }
