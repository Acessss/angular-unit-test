import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService测试', () => {
  let service: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterService);
  });

  it('MasterService创建', () => {
    expect(service).toBeTruthy();
  });

  it('#getTitle 返回valueService注入的title', () => {
    service = new MasterService(new ValueService());
    expect(service.getTitle()).toBe('title from valueService');
  });

  it('#getTitle 返回fake注入的title', () => {
    const fake =  { getTitle: () => 'fake title' };
    service = new MasterService(fake as ValueService);
    expect(service.getTitle()).toBe('fake title');
  });

  it('#getTitle 返回spy的模拟值', () => {
    // create `getTitle` spy on an object representing the ValueService
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getTitle']);
    // set the value to return when the `getTitle` spy is called.
    const stubValue = 'title from valueService';
    valueServiceSpy.getTitle.and.returnValue(stubValue);
    service = new MasterService(valueServiceSpy);

    expect(service.getTitle())
      .toBe(stubValue, 'title from valueService failed');
    expect(valueServiceSpy.getTitle.calls.count())
      .toBe(1, 'spy method was called once');
    expect(valueServiceSpy.getTitle.calls.mostRecent().returnValue)
      .toBe(stubValue);
  });
});
