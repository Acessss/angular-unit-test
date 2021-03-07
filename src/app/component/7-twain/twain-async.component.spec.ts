import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { last } from 'rxjs/operators';
import { asyncData } from 'src/app/utils/async-observable-helpers';

import { TwainComponent } from './twain.component';
import { TwainService } from './twain.service';
/**
 * 通常，测试本身不应该调用远程服务器。它们应该模拟这样的调用
 */
describe('TwainComponent 异步测试2', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;
  const testQuote = 'should show quote';
  let quoteEl: HTMLElement;
  let service: TwainService;
  let getQuoteSpy: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwainComponent],
      providers: [{ provide: TwainService, useValue: {} } ]
    }).compileComponents();

    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;
    quoteEl = fixture.nativeElement.querySelector('.twain');
    service = TestBed.inject(TwainService); // get your service
    service.getQuote = () => asyncData(testQuote); // you can pass data here if the service returns something

    // Create a fake TwainService object with a `getQuote()` spy
    const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
    /**
     * 这个间谍的设计目标是让所有对 getQuote 的调用都会收到一个带有测试名言的可观察对象
     * 与真正的 getQuote() 方法不同，这个间谍会绕过服务器，并返回一个立即同步提供可用值的可观察对象。
     */
    getQuoteSpy = twainService.getQuote.and.returnValue(asyncData(testQuote));
  });

  function errorMessage(): string {
    return component.errorMessage;
  }

  it('使用自定义的异步测试方法模拟 getQuote (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();  // ngOnInit()
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');

    tick();                   // flush the observable to get the quote
    fixture.detectChanges();  // update view

    expect(quoteEl.textContent).toBe(testQuote, 'should show quote');
    expect(errorMessage()).toBe('');
  }));

  /**
   * 使用 waitForAsync() 工具函数重写
   * waitForAsync() 工具函数通过把测试代码安排到在特殊的异步测试区（async test zone）下运行来隐藏某些用来处理异步的样板代码。
   * 通过调用 fixture.whenStable() 函数来揭示本测试的异步性，因为该函数打破了线性的控制流。
   * 在 waitForAsync() 中使用 intervalTimer()（比如 setInterval()）时，需要在测试后通过 clearInterval() 取消这个定时器，否则 waitForAsync() 永远不会结束。
   */
  it('使用waitForAsync重写测试 getQuote (async)', waitForAsync(() => {
    fixture.detectChanges();  // ngOnInit()
    expect(quoteEl.textContent).toBe('...', 'should show placeholder');

    /**
     * fixture.whenStable() 返回一个 Promise，它会在 JavaScript 引擎的任务队列变空时解析。在这个例子中，当可观察对象有返回值，任务队列就会变为空。
     * 测试会在该 Promise 的回调中继续进行，它会调用 detectChanges() 来用期望的文本更新元素
     */
    fixture.whenStable().then(() => {  // wait for async getQuote
      fixture.detectChanges();         // update view with quote
      expect(quoteEl.textContent).toBe(testQuote);
      expect(errorMessage()).toBe('');
    });
  }));

  /**
   * 我的理解是，对于异步的方法，用 waitForAsync + whenStable 或是 fakeAsync + tick 组合进行测试？、
   */

  /**
   *  waitForAsync() 和 fakeAsync() 函数可以简化 Angular 的异步测试，也可以回退到传统技术，，并给 it 传一个以 done 回调为参数的函数。
   *  要自己负责串联各种 Promise、处理错误，并在适当的时机调用 done()
   *  不能在 waitForAsync() 或 fakeAsync() 函数中调用 done()，因为那里的 done 参数是 undefined。
   *  编写带有 done() 的测试函数要比用 waitForAsync() 和 fakeAsync() 的形式笨重。但是当代码涉及到像 setInterval 这样的 intervalTimer() 时，它往往是必要的
   *  https://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support
   */
  it('使用done测试 getQuote (async)', (done: DoneFn) => {
    fixture.detectChanges();

    component.quote.pipe(last()).subscribe(() => {
      fixture.detectChanges();  // update view with quote
      expect(quoteEl.textContent).toBe(testQuote);
      expect(errorMessage()).toBe('');
      done();
    });
  });

});
