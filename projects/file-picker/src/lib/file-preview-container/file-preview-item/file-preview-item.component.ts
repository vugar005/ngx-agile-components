import { FilePreviewModel } from './../../file-preview.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'file-preview-item',
  templateUrl: './file-preview-item.component.html',
  styleUrls: ['./file-preview-item.component.scss']
})
export class FilePreviewItemComponent implements OnInit {
  @Input() fileItem: FilePreviewModel;
  constructor() { }

  ngOnInit() {
  }

}
