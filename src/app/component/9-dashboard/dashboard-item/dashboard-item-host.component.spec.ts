import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { click } from 'src/app/utils/click-helpers';
import { TestHostComponent } from '../test-host.component';

import { DashboardItemComponent } from './dashboard-item.component';

/**
 * 排除多余的干扰，如*ngFor、 其它组件、布局 HTML、附加绑定、注入了多个服务的构造函数等，创造一个测试宿主
 * 这个测试就可以轻松检查 selectedPlugin 以验证 DashboardItemComponent.selected 事件确实发出了所期望的值
 *
 * 这个测试模块的配置信息有三个重要的不同点：
 * 1、它同时声明了 DashboardItemComponent 和 TestHostComponent
 * 2、它创建了 TestHostComponent，而非 DashboardItemComponent
 * 3、TestHostComponent 通过绑定机制设置了 DashboardItemComponent.plugin
 */
describe('DashboardItemComponent 测试位于宿主中的组件', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let heroEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardItemComponent, TestHostComponent],
      imports: [RouterTestingModule, HttpClientModule],
    });
    // createComponent 返回的 fixture 里有 TestHostComponent 实例，而非 DashboardItemComponent 组件实例
    // TestHostComponent 包含 DashboardItemComponent 的模板，因此可以找到自组件中的dom
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl = fixture.nativeElement.querySelector('.plugin');
    fixture.detectChanges(); // trigger initial data binding
  });

  it('测试输入属性的绑定', () => {
    const imgEl = fixture.nativeElement.querySelector('.img');
    const expectedPipedName = testHost.plugin.imgUrl.toUpperCase();
    expect(imgEl.textContent).toContain(expectedPipedName);
  });

  /**
   * 对比 DashboardItemComponent 的 event 传递
   * 它只要确保 DashboardItemComponent通过事件绑定被传递到host组件
   */
  it('测试宿主中的事件传递', () => {
    click(heroEl);
    // selected hero should be the same data bound hero
    expect(testHost.selectedPlugin).toBe(testHost.plugin);
  });
});
