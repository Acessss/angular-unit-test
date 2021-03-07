import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { TwainComponent } from './twain.component';
import { TwainService } from './twain.service';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { of } from 'rxjs';

/**
 * 弹珠测试 https://rxjs.dev/guide/testing/marble-testing
 * 弹珠帧是测试时间线上的虚拟单位。每个符号（ - ， x ， | ， # ）都表示经过了一帧。
 * 冷可观察对象在你订阅它之前不会产生值。你的大多数应用中可观察对象都是冷的。所有的 HttpClient 方法返回的都是冷可观察对象。
 * 而热可观察对象在订阅它之前就已经在生成了这些值。用来报告路由器活动的 Router.events 可观察对象就是一种热可观察对象
 */
describe('TwainComponent 弹珠测试', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  let testQuote: string;
  let getQuoteSpy: jasmine.SpyObj<any>;
  let quoteEl: HTMLElement;

  beforeEach(() => {
    testQuote = 'Test Quote';

    // Create a fake TwainService object with a `getQuote()` spy
    const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
    /**
     * 这个间谍的设计目标是让所有对 getQuote 的调用都会收到一个带有测试名言的可观察对象
     * 与真正的 getQuote() 方法不同，这个间谍会绕过服务器，并返回一个立即同步提供可用值的可观察对象。
     */
    getQuoteSpy = twainService.getQuote.and.returnValue(of(testQuote));

    TestBed.configureTestingModule({
      declarations: [TwainComponent],
      providers: [{ provide: TwainService, useValue: twainService }],
    });

    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.twain');
  });

  function errorMessage(): string {
    return component.errorMessage;
  }

  /**
   * 这个 Jasmine 测试是同步的。没有 fakeAsync()。 弹珠测试使用测试调度程序（scheduler）来模拟同步测试中的时间流逝
   * 弹珠测试的美妙之处在于对可观察对象流的视觉定义。
   */
  it('should show quote after getQuote (marbles)', () => {
    // 这个测试定义了一个冷可观察对象，它等待三帧（ --- ），发出一个值（ x ），并完成（ | ）。在第二个参数中，你把值标记（ x ）映射到了发出的值（ testQuote ）
    // 这个弹珠库会构造出相应的可观察对象，测试程序把它用作 getQuote 间谍的返回值。
    const q$ = cold('---x|', { x: testQuote });
    getQuoteSpy.and.returnValue( q$ );

    fixture.detectChanges(); // ngOnInit()
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');

    getTestScheduler().flush(); // flush the observables

    // 当你准备好激活弹珠的可观察对象时，就告诉 TestScheduler 把它准备好的任务队列刷新一下。
    // 这个步骤的作用类似于之前的 fakeAsync() 和 waitForAsync() 例子中的 tick() 和 whenStable() 测试
    fixture.detectChanges(); // update view

    expect(quoteEl.textContent).toBe(testQuote, 'should show quote');
    expect(errorMessage()).toBe('');
  });

  // 调用 fakeAsync() 和 tick()，因为该组件在处理错误时会调用 setTimeout()。
  it('should display error when TwainService fails（marbles）', fakeAsync(() => {
    // observable error after delay
    // 冷可观察对象，等待三帧，然后发出一个错误，井号（#）标出了在第三个参数中指定错误的发生时间。第二个参数为 null，因为该可观察对象永远不会发出值。
    const q$ = cold('---#|', null, new Error('TwainService test failure'));
    getQuoteSpy.and.returnValue( q$ );

    fixture.detectChanges(); // ngOnInit()
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');

    getTestScheduler().flush(); // flush the observables
    tick();                     // component shows error after a setTimeout()
    fixture.detectChanges();    // update error message

    expect(errorMessage()).toMatch(/test failure/, 'should display error');
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');
  }));

});
