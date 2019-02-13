import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CheckboxStatus } from './checkbox-status';
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
import { Subject, combineLatest, timer } from 'rxjs';
import { takeUntil, delay, map, switchMap } from 'rxjs/operators';
import { isArray } from 'util';
import { TableEditerAction } from './table-action.model';

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
          *ngIf="rowSelection"
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

      <tr>
        <td
        *ngIf="rowSelection"
        rowsToggleAllCheckbox
        >
        <!-- <div class="ngx-checkmark-container">
            <input type="checkbox" /> <span class="ngx-checkmark"></span>
          </div> -->
        </td>
        <td *ngIf="indexNumber" class="ngx-index-number"></td>

        <td *ngFor="let col of visibleColumnDefs" [attr.col-key]="col?.i" >
           <div class="filter-cell"> <input value="Search {{col.i }}"> </div>
        </td>
        <td *ngIf="editTemplate" class="ngx-native-table-editTemplate">
        </td>
      </tr>

        <tr
          *ngFor="let row of rowData; let i = index"
          [attr.row-id]="row?.id"
          [data]="row"
          rowCheckbox
        >
          <td
            *ngIf="rowSelection"
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
           <div class="data-cell"> <a [title] ="row[col.i]"> {{ row[col.i] }} </a></div>
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
  <ngx-simple-paginator *ngIf="pagination && rowCount"
  [length] = "rowCount"
  [pageSize]="10"
  (page)="onPageChange($event)"
  > </ngx-simple-paginator>

    </ng-container>

  `,
  styleUrls: ['./native-table.component.scss'],
  providers: [NativeTableService]
})
export class NgxNativeTableComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(RowCheckboxDirective) public rowCheckboxes: QueryList<any>;
  @Input() config: any;
  @Input() pagination = true;
  @Input() pageSize = 150;
  @Input() rowSelection = true;
  @ViewChild(ConfirmModalComponent) confirmRef: ConfirmModalComponent;
  @Input() indexNumber = true;
  @Input() editTemplate: TemplateRef<any>;
  @Input() dialogRef: any;
  @Output() rowRemoved = new EventEmitter();
  @Output()
  actionClick = new EventEmitter<TableEditerAction>();
  @ContentChild('', { read: ElementRef }) editerComponent: any;
  rowData: any;
  allColumnDefs: any;
  visibleColumnDefs = [];
  hiddenColumnNames: string;
  defaultColumnDefs: any;
  pageQuery: PageQuery = new PageQuery();
  activeEditMenuIndex: string | number;
  _onDestroy$ = new Subject<void>();
  shConfirmModal: boolean;
  loading: boolean;
  rowCount: number;
  /** Full table data response */
  tableData: any;
  constructor(public tableService: NativeTableService) {}

  ngOnInit() {
    this.pageQuery = {...this.pageQuery, pageSize: this.pageSize};
    this.getTableData( this.pageQuery, true);
    this.listenToGetDataEvent();
  }
  listenToGetDataEvent(): void {
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
  onPageChange(e): void {
    this.pageQuery.pageIndex = e.pageIndex;
    this.pageQuery.pageSize = e.pageSize;
    this.getTableData(this.pageQuery);
  }
  ngAfterViewInit() {}
  ngOnDestroy() {
    this._onDestroy$.next();
  }
 get isRowSelected(): boolean {
   if (!this.getCheckedRows() ) {return; }
   return this.getCheckedRows().length > 0;
  }
  getCheckedRows(): RowCheckboxDirective[] {
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
    this.rowData = null;
    this.tableService.getTableData(pageQuery, this.config).subscribe(
      res => {
        this.tableData = res;
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
      //  if (newColumns && !this.rowData) {
          this.buildColumns(res);
          this.setColumnsView(res);
        if (!this.rowCount) {this.rowCount = res.tbl[0].rowCount; }
        this.buildRows(res);
      }
    } catch (er) {console.log(er); }
  }
  buildRows(data): void {
   // this.pageLength = data.tbl[0].rowCount;
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
    /** determines which columns to display on table view */
 //   this.toggleColumns(this.visibleColumnDefs);
  }
  toggleColumns(): void {
    console.log( [...this.defaultColumnDefs].filter(colDef => (this.visibleColumnDefs.map(col => col.n))));
    console.log((this.visibleColumnDefs.map(col => col.n).join(',')));
   this.visibleColumnDefs = [...this.defaultColumnDefs].
   filter(colDef => ( this.visibleColumnDefs.map(col => col.n).join(',')).includes(colDef.n));
   this.sendHiddenColumns(this.visibleColumnDefs, this.allColumnDefs);
  }
  /** Saves hidden collumn names to server */
  sendHiddenColumns(visibleColumnDefs, allColumnDefs): void {
    const hiddenColumnNames = [...allColumnDefs]
   .filter(colDef => !(visibleColumnDefs.map(col => col.n).join(',').includes(colDef.n)))
   .map(colDef => colDef.i) ;
   console.log(hiddenColumnNames);
   const hiddenColumnNamesSplitted: string = hiddenColumnNames ? hiddenColumnNames.join(',') : '';
   const tableName: string = this.tableData && this.tableData.tbl && this.tableData.tbl[0] && this.tableData.tbl[0].tn;
   this.actionClick.next({type: 'toggleColumnView', data: {
     tableName: tableName,
     hiddenColumnNames: hiddenColumnNamesSplitted
   }});
  }
  showAllColumns(): void {
    this.visibleColumnDefs = [...this.defaultColumnDefs];
    this.sendHiddenColumns(this.visibleColumnDefs, this.allColumnDefs);
  }
  hideAllColumns(): void {
    this.visibleColumnDefs = [];
    this.sendHiddenColumns(this.visibleColumnDefs, this.allColumnDefs);
  }
  addData(): void {
    this.actionClick.next({type: 'insert'});
  }
  onRemove(data): void {
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
  onMultiRemove(): void {
  try {
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
  } catch (er) {
    console.log(er);
  }
  }
  removeData(data): void {
    const dataArray: RowCheckboxDirective[] = [];
    const combinedObsArray = [];
    if (isArray(data)) {
      dataArray.push(...data);
    } else {
      dataArray.push(data);
    }
    dataArray.forEach((row: RowCheckboxDirective, i) => {
        combinedObsArray.push( timer(i * 50).pipe(
          switchMap(res => this.tableService.removeRow(row.data, this.config)))
        );
  });
  console.log(dataArray);
   combineLatest(...combinedObsArray).subscribe(
         res => {
    //  this.rowRemoved.next(row);
      this.tableService.getTableData$.next();
      console.log('removing --', dataArray);
         });
}
onPrint() {
  console.log('on print');
}
onExport() {
  console.log('on export');
}
  }
