import { NgForm } from '@angular/forms';

export function getFormErrors(ntForm: NgForm, str: string) {
  if (!ntForm) {return; }
  if (ntForm && ntForm.controls[str] ) {
    const control = ntForm.controls[str];
    const errors = control.errors;
    if (!errors) { return; }
    if (errors.minlength) {
      return `* Minmimum length ${errors.minlength.requiredLength} required`;
    } else if (errors.maxlength) {
      return `* Max length ${errors.maxlength.requiredLength} required`;
    } else if (errors.required) {
      return  `* Please fill this field`;
    } else if (errors.email) {
      return  `* Please enter valid email`;
    } else if (errors.min) {
      return `* Minmimum  ${errors.requiredValue} required`;
    } else if (errors.max) {
      return `* Max  ${errors.requiredValue} required`;
    } else if (errors.phone) {
      return `* Not valid phone number`;
    } else if (errors.serverError) {
      return errors.serverError;
    } else {
      return errors;
    }
  }
}
