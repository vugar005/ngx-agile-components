import { CheckboxStatus } from './checkbox-status';
import { ApiConfig } from './api-config.model';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef,
        ContentChild, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { NativeTableService } from './native-table.service';
import { PageQuery } from './page-query.model';
import { RowCheckboxDirective } from './row-checkbox.directive';

@Component({
  selector: 'ngx-native-table',
  template: `
   <table class="ngx-native-table">
   <thead>
   <th *ngIf="enableCheckboxSelection"></th>
   <th *ngIf="indexNumber" class="ngx-index-number">#</th>

   <th *ngFor="let col of visibleColumnDefs" [attr.col-key]="col?.i">
   {{col.n}}
   </th>
   <th *ngIf="editTemplate" class="ngx-native-table-editTemplate" > Editer </th>
   </thead>
   <tbody>
   <tr *ngFor="let row of rowData; let i = index" [attr.row-id]="row?.id">
   <td *ngIf="enableCheckboxSelection" rowCheckbox>
      <label class="ngx-checkmark-container">
        <input type="checkbox">
        <span class="ngx-checkmark"></span>
     </label>
   </td>
   <td *ngIf="indexNumber" class="ngx-index-number"> {{i+1}}</td>

    <td *ngFor="let col of visibleColumnDefs" [attr.col-key]="col?.i">
    {{row[col.i]}}
    </td>
    <td *ngIf="editTemplate" class="ngx-native-table-editTemplate"
     [ngStyle]="{'z-index': activeEditMenuIndex === i ? '2' : '0' }">
     <row-editer [row]="row" [index]="i" (open)="activeEditMenuIndex=$event">
      <ng-container  *ngTemplateOutlet="editTemplate"> </ng-container>
     </row-editer>
     </td>
   </tr>
   </tbody>
   </table>
  `,
  styles: [
    `
    .ngx-native-table {
      display: table;
      table-layout: auto;
      border-collapse: seperate;
      width: 100%;
      background: #ffffff;
    }
    th.ngx-index-number {
      z-index: 3!important;
    }
    .ngx-index-number {
      position: sticky;
      left: 0;
      background: #ffffff;
    }
    td.checked .ngx-checkmark:after {
      display: block;
    }
    .ngx-checkmark-container {
      position: relative;
      cursor: pointer;
      pointer-events: none;
      font-size: 22px;
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
      height: 25px;
      width: 25px;
      background-color: #eee;
    }
    .ngx-checkmark:after {
      content: "";
      position: absolute;
      display: none;
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    .ngx-checmark:after {
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    .ngx-native-table thead {
      color: rgba(0,0,0,.54);
    }
    .ngx-native-table th {
      padding: 0.8rem;
      border-bottom: 1px solid #e0e0e0;
      position: sticky;
      top: 0;
      background: #ffffff;
      z-index: 2;
    }
    .ngx-native-table tr {
    }
    .ngx-native-table td {
      padding: 0.7rem;
      border-bottom: 1px solid #e0e0e0;

    }
    .ngx-native-table-editTemplate {
      position: sticky;
      right: 0;
      background: #ffffff;
      border-left: 1px solid #e0e0e0;;
    }
    `
  ],
  providers: [NativeTableService]
})
export class NgxNativeTableComponent implements OnInit, AfterViewInit {
  @ViewChildren(RowCheckboxDirective) rowCheckboxes: QueryList<any>;
  @Input() config: ApiConfig;
  @Input() indexNumber = true;
  @Input() editTemplate: TemplateRef<any>;
  @Input() dialogRef: any;
  @Input() enableCheckboxSelection = true;
  @Output() rowAdd = new EventEmitter();
  @Output() rowEdit = new EventEmitter();
  @Output()
  optClick = new EventEmitter<any>();
  @ContentChild('', {read: ElementRef}) editerComponent: any;
  rowData: any;
  allColumnDefs: any;
  defaultColumnDefs: any;
  visibleColumnDefs: any;
  hiddenColumnNames: string[];
  pageLength: number;
  pageQuery: PageQuery = new PageQuery();
  activeEditMenuIndex: string | number;

  constructor(public tableService: NativeTableService) { }

  ngOnInit() {
    this.getTableData(this.pageQuery, true);
  }
  ngAfterViewInit() {
    console.log(this.rowCheckboxes);
    this.getCheckedRows();
  }
  getCheckedRows() {
   const checkedRows = this.rowCheckboxes.toArray()
   .filter((row: RowCheckboxDirective) => row.checkBoxStatus === CheckboxStatus.checked);
   console.log(checkedRows);
  }
  getTableData(pageQuery: PageQuery, newColumns = false): void {
    this.tableService.getTableData(pageQuery, this.config).subscribe(
      res => this.buildTableData(res, newColumns),
      (er: Error) => {
          console.log(`Error: ${er.message}`);
     }
    );
  }
  buildTableData(res, newColumns): void {
    if (res && res.tbl[0] && res.tbl[0].c) {
      if (newColumns) {
        this.buildColumns(res);
        this.setColumnsView(res);
      }
      this.buildRows(res);
    } else {
    //  this.gridApi.showNoRowsOverlay();
    }
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
    this.defaultColumnDefs = [...this.allColumnDefs].filter( col => defaultColumnNames.includes(col.i));
    this.visibleColumnDefs = this.defaultColumnDefs.slice().filter(col => !this.hiddenColumnNames.includes(col.i));
    console.log('allCol', this.allColumnDefs)
    console.log('defaultCol', this.defaultColumnDefs)
    console.log('visibCols', this.visibleColumnDefs)
    /** determines which columns to display on table view */
    this.toggleColumns(this.visibleColumnDefs);
  }
  toggleColumns(selectedColumns): void {
    // const columns = [...this.allColumnDefs.map(res => res.id)];
    // columns.forEach((col, index) => {
    //   if ( (!selectedColumns.includes(col)) ) {
    //     this.changeColumnsVisibility(col, false);
    //   } else {
    //     this.changeColumnsVisibility(col, true);
    //   }
    // });
  }
  addData(): void {
    this.rowAdd.next();
    this.optClick.next('insert');
  }

}
