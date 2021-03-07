import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { TwainComponent } from './twain.component';
import { TwainService } from './twain.service';
/**
 * 通常，测试本身不应该调用远程服务器。它们应该模拟这样的调用
 */
describe('TwainComponent 异步测试', () => {
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
   * 同步 Observable 的一个关键优势是，你通常可以把异步过程转换成同步测试
   * 当间谍的结果同步返回时， getQuote() 方法会在第一个更改检测周期（Angular 在这里调用 ngOnInit）后立即更新屏幕上的消息
   * 如果要测试 errorMessage，由于组件方法里调用了  setTimeout()，测试必须是异步的
   */
  it('should show quote after component initialized', () => {
    fixture.detectChanges(); // onInit()

    // sync spy result shows testQuote immediately after init
    expect(quoteEl.textContent).toBe(testQuote);
    expect(getQuoteSpy.calls.any()).toBe(true, 'getQuote called');
  });

  /**
   * 使用 fakeAsync() 进行异步测试
   * fakeAsync() 需导入 zone.js/dist/zone-testing，Angular CLI 创建的项目已经配置好了 zone-testing
   * 当该服务返回 ErrorObservable 时，下列测试会对其预期行为进行确认
   * 通过在一个特殊的 fakeAsync test zone（译注：Zone.js 的一个特例） 中运行测试体，fakeAsync() 函数可以启用线性编码风格。
   * 这个测试体看上去是同步的。没有像 Promise.then() 这样的嵌套语法来破坏控制流。
   * 限制：如果测试体要进行 XMLHttpRequest （XHR）调用，则 fakeAsync() 函数无效，如果需要，则需要使用 waitForAsync()
   */
  it('should display error when TwainService fails', fakeAsync(() => {
    // tell spy to return an error observable
    getQuoteSpy.and.returnValue(throwError('TwainService test failure'));

    fixture.detectChanges(); // onInit()
    // sync spy errors immediately after init

    /**
     * 调用 tick() 来推进（虚拟）时钟
     * 调用 tick() 时会在所有挂起的异步活动完成之前模拟时间的流逝。在这种情况下，它会等待错误处理程序中的 setTimeout()
     * tick() 函数接受毫秒数(milliseconds) 和 tick 选项(tickOptions) 作为参数，毫秒数（默认值为 0）参数表示虚拟时钟要前进多少
     * tickOptions 是一个可选参数，它带有一个名为 processNewMacroTasksSynchronously 的属性（默认为 true），表示在 tick 时是否要调用新生成的宏任务。
     * tick() 是 fakeAsync() 的伴生工具，你只能在 fakeAsync() 测试体内调用它
     */
    tick(); // flush the component's setTimeout()

    fixture.detectChanges(); // update errorMessage within setTimeout()

    expect(errorMessage()).toMatch(/test failure/, 'should display error');
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');
  }));

  it('should run new macro task callback with delay after call tick with millis', fakeAsync(() => {
    function nestedTimer(cb: () => any): void {
      setTimeout(() => setTimeout(() => cb()));
    }
    const callback = jasmine.createSpy('callback');
    nestedTimer(callback);
    expect(callback).not.toHaveBeenCalled();
    tick(0);
    // the nested timeout will also be triggered
    expect(callback).toHaveBeenCalled();
  }));

  it('should not run new macro task callback with delay after call tick with millis', fakeAsync(() => {
    function nestedTimer(cb: () => any): void {
      setTimeout(() => setTimeout(() => cb()));
    }
    const callback = jasmine.createSpy('callback');
    nestedTimer(callback);
    expect(callback).not.toHaveBeenCalled();
    tick(0, { processNewMacroTasksSynchronously: false });
    // 由于 processNewMacroTasksSynchronously 为false, 宏任务不会被同时执行
    expect(callback).not.toHaveBeenCalled();
    tick(0);
    expect(callback).toHaveBeenCalled();
  }));

  /**
   * 有时可能更关心注入的服务方法是如何被调的以及它返回了什么值，而不是屏幕显示的内容
   */
  it('should show quote after getQuote (spy done)', (done: DoneFn) => {
    fixture.detectChanges();

    // the spy's most recent call returns the observable with the test quote
    getQuoteSpy.calls.mostRecent().returnValue.subscribe(() => {
      fixture.detectChanges(); // update view with quote
      expect(quoteEl.textContent).toBe(testQuote);
      expect(errorMessage()).toBe('');
      done();
    });
  });
});

/**
 * Jasmine 还为模拟日期提供了 clock 特性
 * 在 jasmine.clock().install() 之后， 在 fakeAsync() 内调用时自动运行，直到调用了 jasmine.clock().uninstall()
 * fakeAsync() 不是必须的
 */
describe('use jasmine.clock()', () => {
  // need to config __zone_symbol__fakeAsyncPatchLock flag
  // before loading zone.js/dist/zone-testing
  beforeEach(() => {
    jasmine.clock().install();
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  });
  it('should auto enter fakeAsync', () => {
    // is in fakeAsync now, don't need to call fakeAsync(testFn)
    let called = false;
    setTimeout(() => {
      called = true;
    }, 100);
    jasmine.clock().tick(100);
    expect(called).toBe(true);
  });
});
