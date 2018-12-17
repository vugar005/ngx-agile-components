import { Component, OnInit, Host, Input, EventEmitter, Output } from '@angular/core';
import { NgxNativeTableComponent } from '../native-table.component';

@Component({
  selector: 'row-editer',
  templateUrl: './row-editer.component.html',
  styleUrls: ['./row-editer.component.scss']
})
export class RowEditerComponent  {
  @Input() row: any;
  @Input() index: string | number;
  @Output() open = new EventEmitter<string | number>();
  @Output() close = new EventEmitter<string | number>();
  optBtns: any;
  optClickListener = this.handleOpClick.bind(this);
  constructor(@Host() private tableComponent: NgxNativeTableComponent) { }


  onMenuOpen(): void {
    this.open.next(this.index);
    this.optBtns = document.querySelectorAll('[t-btn]');
    Array.from(this.optBtns).forEach((btn: HTMLElement) => {
     btn.addEventListener('click', this.optClickListener, true);
     btn.classList.add('ngx-cell-editor-btn');
    });
  }
  onMenuClose(): void {
    this.close.next(this.index);
//     Array.from(this.optBtns).forEach((btn: HTMLElement) => {
//       console.log('remove ltn called');
//  //     btn.removeEventListener('click', this.optClickListener, true);
//     });
  }
  handleOpClick(el: MouseEvent): void {
    const attribute = el.srcElement.getAttribute('t-btn');
    const obj = {
      attribute: attribute,
      row: this.row
    };
    switch (attribute) {
      case 'edit':
        this.tableComponent.rowEdit.next(this.row);
        break;
      case 'remove':

        break;
      case 'confirm':
     //   this.onConfirm();
        break;
      case'unConfirm':
      //  this.onUnConfirm();
        break;
    }
    this.tableComponent.optClick.next(obj);
  }
}
