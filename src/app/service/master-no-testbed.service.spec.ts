import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

/**
 * 没有 beforeEach() 的测试，不使用TestBed
 * 显式地创建类
 * 使用解构赋值来提取所需的设置变量
 */
describe('没有beforeEach，不使用TestBed测试MasterService', () => {

  // tslint:disable-next-line: typedef
  function setup() {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getTitle']);
    const stubValue = 'stub value';
    const masterService = new MasterService(valueServiceSpy);

    valueServiceSpy.getTitle.and.returnValue(stubValue);
    return { masterService, stubValue, valueServiceSpy };
  }

  it('#getTitle 返回spy的模拟值', () => {
    const { masterService, stubValue, valueServiceSpy } = setup();
    expect(masterService.getTitle())
      .toBe(stubValue, 'title from valueService failed');
    expect(valueServiceSpy.getTitle.calls.count())
      .toBe(1, 'spy method was called once');
    expect(valueServiceSpy.getTitle.calls.mostRecent().returnValue)
      .toBe(stubValue);
  });
});
