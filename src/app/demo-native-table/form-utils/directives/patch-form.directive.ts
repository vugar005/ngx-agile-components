import { Directive, AfterViewInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[patch-form]'
})
export class PatchFormDirective implements AfterViewInit {
  @Input()
  form: NgForm;
  @Input()
  data: any;
  constructor() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.patchForm(this.form, this.data);
    }, 0);
  }
  patchForm(ntForm: NgForm, data) {
    if (!ntForm || !data) {
      return;
    }
    for (const key in data) {
      if (ntForm.form.controls[key]) {
        ntForm.form.controls[key].patchValue(data[key]);
        ntForm.form.controls[key].markAsTouched();
      }
    }
  }
}
