import { TestBed } from '@angular/core/testing';

import { LinechartService } from './linechart.service';

describe('LinechartService', () => {
  let service: LinechartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinechartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
