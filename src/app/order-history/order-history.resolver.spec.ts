import { TestBed } from '@angular/core/testing';

import { OrderHistoryResolver } from './order-history.resolver';

describe('OrderHistoryResolver', () => {
  let resolver: OrderHistoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderHistoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
