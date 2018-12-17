import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Output() submitted = new EventEmitter();
  @Output() closed = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
