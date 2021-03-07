import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
/**
 *
 */
describe('BannerComponent minial demo', () => {
  it('should create', () => {
    // 声明了要测试的组件 BannerComponent，默认的测试模块预先配置了像来自 @angular/platform-browser 的 BrowserModule。
    TestBed.configureTestingModule({declarations: [BannerComponent]});
    /**
     * 创建 BannerComponent 的实例，把一个对应元素添加到了测试运行器的 DOM 中，并返回一个ComponentFixture 对象。
     * 注：
     *  调用 createComponent 后不能再重新配置 TestBed 。
     *  createComponent 方法会冻结当前的 TestBed 定义，并把它关闭以防止进一步的配置。
     *  不能再调用任何 TestBed 配置方法，否则会报错
     */
    const fixture = TestBed.createComponent(BannerComponent);
    // ComponentFixture 是一个测试挽具，用于与所创建的组件及其对应的元素进行交互。
    // 可以通过测试夹具（fixture）访问组件实例，并用 Jasmine 的期望断言来确认它是否存在
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
