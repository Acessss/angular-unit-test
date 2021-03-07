import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from '../app.module';
import { TestPipeComponent } from './test-pipe/test-pipe.component';


describe('TitleCasePipe 管道dom测试', () => {
  let fixture: ComponentFixture<TestPipeComponent>;
  let component: TestPipeComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestPipeComponent);
    component = fixture.componentInstance;
  });

  it('should bind the input to the correct property', () => {
    // first round of change detection
    fixture.detectChanges();

    // get ahold of the input
    const input = fixture.debugElement.query(By.css('#myInput'));
    const inputElement = input.nativeElement;
    const span = fixture.debugElement.query(By.css('#myInputUpper'));
    const spanElement = span.nativeElement;

    // set input value
    inputElement.value = 'test value';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.myInputValue).toBe('test value');

    fixture.detectChanges();
    expect(spanElement.textContent).toBe('Test Value');
  });

  // 下述方法不生效，需要找时间对比一下 hostElement.querySelector 和 fixture.debugElement.query 的区别
  // it('should convert title to Title Case', () => {
  //   // get the name's input and display elements from the DOM
  //   const hostElement = fixture.nativeElement;
  //   const nameInput: HTMLInputElement = hostElement.querySelector('input');
  //   const nameDisplay: HTMLElement = hostElement.querySelector('span');

  //   // simulate user entering a new name into the input box
  //   nameInput.value = 'quick BROWN  fOx';
    
  //   // Dispatch a DOM event so that Angular learns of input value change.
  //   // In older browsers, such as IE, you might need a CustomEvent instead. See
  //   // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
  //   nameInput.dispatchEvent(new Event('input'));
  //   console.log(nameInput)
  //   // Tell Angular to update the display binding through the title pipe
  //   fixture.detectChanges();
  //   console.log(nameDisplay)
  //   expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
  // });
});

