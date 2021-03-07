import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';

import { ValueService } from './value.service';
/**
 * 使用TestBed测试依赖ValueService（spy）的MasterService
 */
describe('使用TestBed测试依赖ValueService（spy）的MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getTitle']);

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy }
      ]
    });
    // Inject both the service-to-test and its (spy) dependency
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('#getTitle 返回spy的模拟值', () => {
    const stubValue = 'stub value';
    valueServiceSpy.getTitle.and.returnValue(stubValue);

    expect(masterService.getTitle())
      .toBe(stubValue, 'service returned stub value');
    expect(valueServiceSpy.getTitle.calls.count())
      .toBe(1, 'spy method was called once');
    expect(valueServiceSpy.getTitle.calls.mostRecent().returnValue)
      .toBe(stubValue);
  });
});
