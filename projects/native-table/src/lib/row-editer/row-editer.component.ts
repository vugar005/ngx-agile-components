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
    console.log(this.optBtns);
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
    switch (attribute) {
      case 'edit':
        this.onEdit();
        break;
      case 'remove':
        this.onRemove();
        break;
      case 'confirm':
     //   this.onConfirm();
        break;
      case'unConfirm':
      //  this.onUnConfirm();
        break;
    }
    const obj = {
      attribute: attribute,
      row: this.row
    };
    this.tableComponent.optClick.next(obj);
    console.log('on opt');
  }
  onEdit(): void {
   this.tableComponent.rowEdit.next();
  }
  onRemove(): void {
  }

}
