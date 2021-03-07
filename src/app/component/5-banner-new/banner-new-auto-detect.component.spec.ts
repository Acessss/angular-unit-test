import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { BannerNewComponent } from './banner-new.component';

describe('BannerNewComponent 自动执行变更检测', () => {
  let comp: BannerNewComponent;
  let fixture: ComponentFixture<BannerNewComponent>;
  let h1: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerNewComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });
    fixture = TestBed.createComponent(BannerNewComponent);
    comp = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
  });

  // 自动变更检测 无需 fixture.detectChanges()
  it('should display original title', () => {
    expect(h1.textContent).toContain(comp.title);
  });

  /**
   * Angular 测试环境不知道测试改变了组件的 title
   * ComponentFixtureAutoDetect 服务会响应异步活动，例如 Promise、定时器和 DOM 事件。但却看不见对组件属性的直接同步更新
   * 必须用 fixture.detectChanges() 来触发另一个变更检测周期
   * 频繁的调用 detectChanges() 毫无危害，没必要只在非常必要时才调用它
   */
  it('should still see original title after comp.title change', () => {
    const oldTitle = comp.title;
    comp.title = 'Test Title';
    // Displayed title is old because Angular didn't hear the change :(
    expect(h1.textContent).toContain(oldTitle);
  });

  it('should display updated title after detectChanges', () => {
    comp.title = 'Test Title';
    fixture.detectChanges(); // detect changes explicitly
    expect(h1.textContent).toContain(comp.title);
  });
});
