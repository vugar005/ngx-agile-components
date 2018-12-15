import { TestBed } from '@angular/core/testing';

import { NativeTableService } from './native-table.service';

describe('NativeTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NativeTableService = TestBed.get(NativeTableService);
    expect(service).toBeTruthy();
  });
});
