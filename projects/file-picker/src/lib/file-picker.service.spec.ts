import { TestBed, inject } from '@angular/core/testing';

import { FilePickerService } from './file-picker.service';

describe('FilePickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilePickerService]
    });
  });

  it('should be created', inject([FilePickerService], (service: FilePickerService) => {
    expect(service).toBeTruthy();
  }));
});
