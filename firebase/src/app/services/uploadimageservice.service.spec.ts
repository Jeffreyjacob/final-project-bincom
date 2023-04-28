import { TestBed } from '@angular/core/testing';

import { UploadimageserviceService } from './uploadimageservice.service';

describe('UploadimageserviceService', () => {
  let service: UploadimageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadimageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
