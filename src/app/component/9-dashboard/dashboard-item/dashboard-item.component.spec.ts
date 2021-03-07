import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { click } from 'src/app/utils/click-helpers';

import { DashboardItemComponent } from './dashboard-item.component';
/**
 * 进行父子组件测试
 */
describe('DashboardItemComponent 测试自组件的输入输出', () => {
  let component: DashboardItemComponent;
  let fixture: ComponentFixture<DashboardItemComponent>;
  let itemDe: DebugElement;
  let itemEl: HTMLElement;
  let expectedPlugin;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DashboardItemComponent],
      imports: [RouterTestingModule, HttpClientModule],
    }).createComponent(DashboardItemComponent);
    component = fixture.componentInstance;

    itemDe = fixture.debugElement.query(By.css('.plugin'));
    itemEl = itemDe.nativeElement;
    // mock the hero supplied by the parent component
    expectedPlugin = { id: 1, title: '测试模板', imgUrl: 'xxx.png', intro: 'intro' };

    // simulate the parent setting the input property with that plugin
    component.plugin = expectedPlugin;

    // trigger initial data binding
    fixture.detectChanges();
  });

  // 测试属性赋值
  it('测试输入属性的绑定', () => {
    const imgDe = fixture.debugElement.query(By.css('.img'));
    const imgEl = imgDe.nativeElement;
    const expectedPipedName = expectedPlugin.imgUrl.toUpperCase();
    expect(imgEl.textContent).toContain(expectedPipedName);
  });

  /**
   * 该组件的 selected 属性给消费者返回了一个 EventEmitter，它看起来像是 RxJS 的同步 Observable。 该测试只有在宿主组件隐式触发时才需要显式订阅它。
   * 该测试通过对 selected 的订阅来检测该事件
   */
  it('DebugElement 调用 triggerEventHandler', () => {
    let selectedPlugin;
    component.selected.subscribe(plugin => selectedPlugin = plugin);

    /**
     * DebugElement 有一些用于抽象与原生元素交互的 Angular 属性和方法。
     * Angular 的 DebugElement.triggerEventHandler 可以用事件的名字触发任何数据绑定事件。 第二个参数是传给事件处理器的事件对象。
     */
    itemDe.triggerEventHandler('click', null);
    expect(selectedPlugin).toBe(expectedPlugin);
  });

  it('元素调用自身的click方法', () => {
    let selectedPlugin;
    component.selected.subscribe(plugin => selectedPlugin = plugin);

    itemEl.click();
    expect(selectedPlugin).toBe(expectedPlugin);
  });

  it('调用click辅助函数', () => {
    let selectedPlugin;
    component.selected.subscribe(plugin => selectedPlugin = plugin);

    click(itemEl);
    // click(itemDe);
    expect(selectedPlugin).toBe(expectedPlugin);
  });
});
