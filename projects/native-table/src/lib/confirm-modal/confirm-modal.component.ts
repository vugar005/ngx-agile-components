import { Component, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  animations: [
    trigger('onEnter', [transition(':enter',
      animate('0.1s', keyframes([
        style({ opacity: '0', offset: 0 }),
        style({ opacity: '1', offset: 1 }),
      ]))
   )])
  ]
})
export class ConfirmModalComponent implements OnInit {
 public close$ = new Subject();
 public closeRef$: Observable<any> = this.close$.asObservable();
 @HostBinding('@onEnter') onEnter = true;
  constructor() { }

  ngOnInit() {
  }

}
