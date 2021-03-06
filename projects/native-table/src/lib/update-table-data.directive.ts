import { NgxNativeTableComponent } from './native-table.component';
import { Directive, Input, HostListener, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
@Directive({
  selector: '[updateTableData]'
})
export class UpdateTableDataDirective implements AfterViewInit {
  @Input()
  form: NgForm;
  isLoading: boolean;
  @Input() addtionalFormData: any;
  @Input() table: NgxNativeTableComponent;
  @Output() onClose = new EventEmitter<Object>();
  @HostListener('click')
  onclick() {
    this.tryUpdateTableData();
  }
  constructor() {}
  ngAfterViewInit() {
  }
  tryUpdateTableData() {
    if (!this.form) { return console.warn('form reference is not provided'); }
    if (!this.table.config.updateApi) { return console.warn('update api is not provided'); }
    if (this.isLoading) { return; }
    Object.keys(this.form.controls)
      .map(controlName => this.form.controls[controlName])
      .forEach((control: any) => {
        control.markAsDirty();
      });
    if (!this.form.valid) {
      return;
    }
    if (this.isLoading) {return; }
    this.updateTableData();
  }
  updateTableData() {
    this.isLoading = true;
    this.table.tableService.updateTableData(this.form, this.table.config).subscribe(
      res => {
        this.isLoading = false;
          if (res && res.err && res.err.length > 0) {
          console.log('error on update');
          res.err.forEach(er => {
            Object.keys(this.form.controls).forEach(co => {
              if (co === er.code) {
                this.form.controls[co].setErrors({ serverError: er.val });
              }
            });
          });
        } else {
        this.table.tableService.getTableData$.next();
            this.onClose.next(res);
        }
      },
      er => {
        this.isLoading = false;
        console.log(er);
      }, () => this.isLoading = false
    );
  }
}
