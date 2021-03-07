import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';
/**
 * 使用testBed
 */
describe('testbed生成service', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValueService]});
    service = TestBed.inject(ValueService);
  });

  it('#getTitle 返回`title from valueService`', () => {
    expect(service.getTitle()).toBe('title from valueService');
  });

});
