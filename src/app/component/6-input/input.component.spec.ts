import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

/**
 * 官方demo没有html，暂时没能跑通该测试
 */
describe('InputComponent 使用 dispatchEvent() 改变输入框的值', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * 要模拟用户输入，可以找到 input 元素并设置它的 value 属性。
   * Angular 并不知道你为 input 设置过 value 属性
   * 需要调用 dispatchEvent() 分发 input 事件使得angular读取input的属性，再触发变更检测，从而拿到dom中的值
   */
  it('should convert hero name to Title Case', () => {
    // get the name's input and display elements from the DOM
    const hostElement = fixture.nativeElement;
    // const nameInput: HTMLInputElement = hostElement.querySelector('input');
    // const nameDisplay: HTMLElement = hostElement.querySelector('span');
    const input = fixture.debugElement.query(By.css('input'));
    const inputElement = input.nativeElement;
    const span = fixture.debugElement.query(By.css('span'));
    const spanElement = span.nativeElement;
  
    // simulate user entering a new name into the input box
    inputElement.value = 'aaa';

    // Dispatch a DOM event so that Angular learns of input value change.
    // In older browsers, such as IE, you might need a CustomEvent instead. See
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
    inputElement.dispatchEvent(new Event('input'));

    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();

    expect(spanElement.textContent).toBe('aaa');
  });
});
