import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilePreviewModel } from '../../file-preview.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'preview-lightbox',
  templateUrl: './preview-lightbox.component.html',
  styleUrls: ['./preview-lightbox.component.scss']
})
export class PreviewLightboxComponent implements OnInit {
  @Input() file: FilePreviewModel;
  @Output() close = new EventEmitter<void>();
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  getSafeUrl(file: File) {
    const url = window.URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  onClose(event) {
   this.close.next();
  }

}
