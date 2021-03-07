import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-dashboard-item
      *ngFor="let plugin of plugins"
      [plugin]="plugin"
      (selected)="gotoDetail(plugin.pluginId)"
    >
    </app-dashboard-item>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  plugins = [];
  text: string;

  gotoDetail(id): void {
    this.router.navigateByUrl(`/dashboard-item/${id}`);
  }

  constructor(
    private router: Router,
    private service: DashboardService
    ) {}

  ngOnInit(): void {
    this.service.getAllPlugins().subscribe(e => {
      this.plugins = e.mostPopular;
    });
  }
}
