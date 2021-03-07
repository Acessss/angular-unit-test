import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
/** 排除多余的干扰，如*ngFor、 其它组件、布局 HTML、附加绑定、注入了多个服务的构造函数等，创造一个测试宿主 */
@Component({
  selector: 'app-test-host',
  template: `
    <app-dashboard-item [plugin]="plugin" (selected)="onSelected($event)">
    </app-dashboard-item>
  `,
  styles: [],
})
export class TestHostComponent {
  plugin = { id: 1, title: '测试模板', imgUrl: 'xxx.png', intro: 'intro' };

  selectedPlugin;

  onSelected(plugin): void {
    this.selectedPlugin = plugin;
  }

}
