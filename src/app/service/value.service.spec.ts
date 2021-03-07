import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService测试', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueService);
  });

  it('ValueService创建', () => {
    expect(service).toBeTruthy();
  });

  it('#getTitle 返回`title from valueService`', () => {
    expect(service.getTitle()).toBe('title from valueService');
  });
});
