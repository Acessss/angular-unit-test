import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
/**
 * 只对类的测试可以告诉你类的行为。但无法告诉你这个组件是否能正确渲染、响应用户输入和手势，或是集成到它的父组件和子组件中
 * 想要实现上述测试，需要使用 TestBed 的其它特性以及其他的测试辅助函数
 */
describe('BannerComponent 创建组件时自动生成', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    // 由于 compileComponents 是异步的，所以它使用从 @angular/core/testing 中导入的实用工具函数 waitForAsync
    await TestBed.configureTestingModule({
      declarations: [ BannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
