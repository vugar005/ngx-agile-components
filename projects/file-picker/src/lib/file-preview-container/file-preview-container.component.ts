import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilePreviewModel } from '../file-preview.model';

@Component({
  selector: 'file-preview-container',
  templateUrl: './file-preview-container.component.html',
  styleUrls: ['./file-preview-container.component.scss']
})
export class FilePreviewContainerComponent implements OnInit {
  @Input() previewFiles: FilePreviewModel[];
  @Output() public remove = new EventEmitter<File>();
  constructor() { }

  ngOnInit() {
  }

}
