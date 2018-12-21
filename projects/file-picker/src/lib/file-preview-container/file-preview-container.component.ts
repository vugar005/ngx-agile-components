import { Component, OnInit, Input } from '@angular/core';
import { FilePreviewModel } from '../file-preview.model';

@Component({
  selector: 'file-preview-container',
  templateUrl: './file-preview-container.component.html',
  styleUrls: ['./file-preview-container.component.scss']
})
export class FilePreviewContainerComponent implements OnInit {
  @Input() previewFiles: FilePreviewModel[];
  constructor() { }

  ngOnInit() {
  }

}
