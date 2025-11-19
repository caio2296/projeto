import { TestBed } from '@angular/core/testing';

import { FiltroServiceApi } from './filtro-service-api';

describe('FiltroServiceApi', () => {
  let service: FiltroServiceApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltroServiceApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
