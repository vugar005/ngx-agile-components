import { Component, OnInit, Host, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { NgxNativeTableComponent } from '../native-table.component';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { TableEditerAction } from '../table-action.model';

@Component({
  selector: 'row-editer',
  templateUrl: './row-editer.component.html',
  styleUrls: ['./row-editer.component.scss'],
  animations: [
    trigger('onEnter', [transition(':enter',
      animate('0.1s', keyframes([
        style({ opacity: '0', offset: 0 }),
        style({ opacity: '1', offset: 1 }),
      ]))
   )])
  ]
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
    Array.from(this.optBtns).forEach((btn: HTMLElement) => {
      console.log('remove ltn called');
 //     btn.removeEventListener('click', this.optClickListener, true);
    });
  }
  handleOpClick(el: MouseEvent): void {
    const attribute = el.srcElement.getAttribute('t-btn');
    const obj: TableEditerAction = {
      type: attribute,
      data: this.row
    };
    switch (attribute) {
      case 'remove':
    //    this.tableComponent.onRemove(obj);
        break;
        default:
        this.tableComponent.actionClick.next(obj);
        break;
    }
  }
}
