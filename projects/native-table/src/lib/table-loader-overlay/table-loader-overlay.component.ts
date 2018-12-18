import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'table-loader-overlay',
  templateUrl: './table-loader-overlay.component.html',
  styleUrls: ['./table-loader-overlay.component.scss']
})
export class TableLoaderOverlayComponent implements OnInit {
  rows = new Array(15);
  cols = new Array(5);
  constructor() { }

  ngOnInit() {
  }

}
