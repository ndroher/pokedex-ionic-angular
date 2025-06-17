import { TestBed } from '@angular/core/testing';

import { PokeAPIService } from './pokeapi.service';

describe('PokeAPIService', () => {
  let service: PokeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
