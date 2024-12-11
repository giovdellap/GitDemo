import { TestBed } from '@angular/core/testing';

import { WeekdayService } from './weekday.service';

describe('WeekdayService', () => {
  let service: WeekdayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
