import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent (with beforeEach) test', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [BannerComponent]});
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain "banner works!"', () => {
    /**
     * ComponentFixture.nativeElement 的值是 any 类型的
     * Angular 在编译时不知道 nativeElement 是什么样的 HTML 元素，甚至可能不是 HTML 元素。该应用可能运行在非浏览器平台（如服务器或 Web Worker）上，在那里本元素可能具有一个缩小版的 API，甚至根本不存在。
     * 本指南中的测试都是为了在浏览器中运行而设计的，因此 nativeElement 的值始终是 HTMLElement 或其派生类之一。
     * 因此可以用 querySelector 等方法对dom结构进行操作
     */
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('banner works!');
  });

  it('should have <p> with "banner works!"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p');
    expect(p.textContent).toContain('banner works!');
  });

  /**
   * fixture.nativeElement 是 fixture.debugElement.nativeElement 的便利方法
   * nativeElement 的属性依赖于其运行时环境。你可以在非浏览器平台上运行这些测试，那些平台上可能没有 DOM，或者其模拟的 DOM 不支持完整的 HTMLElement API。
   * Angular 依靠 DebugElement 抽象来在其支持的所有平台上安全地工作。
   * Angular 不会创建 HTML 元素树，而会创建一个 DebugElement 树来封装运行时平台上的原生元素。nativeElement 属性会解包 DebugElement 并返回特定于平台的元素对象。
   * 由于本指南的范例测试只能在浏览器中运行，因此 nativeElement 在这些测试中始终是 HTMLElement
   * 用 fixture.debugElement.nativeElement 重新实现如下
   */
  it('should find the <p> with fixture.debugElement.nativeElement)', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const p = bannerEl.querySelector('p');
    expect(p.textContent).toContain('banner works!');
  });
});
