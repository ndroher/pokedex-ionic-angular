import { TestBed } from '@angular/core/testing';

import { TabEventsService } from './tab-events.service';

describe('TabEventsService', () => {
  let service: TabEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
