import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerNewComponent } from './banner-new.component';

describe('BannerNewComponent 手动执行变更检测', () => {
  let component: BannerNewComponent;
  let fixture: ComponentFixture<BannerNewComponent>;
  let h1: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerNewComponent ],
    });
    fixture = TestBed.createComponent(BannerNewComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('should display original title', () => {
    /**
     * 检查属性插值绑定
     * 当 Angular 执行变更检测时就会发生绑定
     * 在生产环境中，当 Angular 创建一个组件，或者用户输入击键，或者异步活动（比如 AJAX）完成时，就会自动进行变更检测
     * TestBed.createComponent 不会触发变化检测
     * 必须通过调用 fixture.detectChanges() 来告诉 TestBed 执行数据绑定 (启动数据绑定并调用生命周期钩子之前)
     */
    fixture.detectChanges();
    expect(h1.textContent).toContain(component.title);
  });
});
