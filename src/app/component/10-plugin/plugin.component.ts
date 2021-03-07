import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PluginService } from './plugin.service';

@Component({
  selector: 'app-plugin',
  template: `
    <app-plugin-item
      *ngFor="let plugin of plugins"
      [plugin]="plugin"
      (selected)="gotoDetail(plugin.pluginId)"
    >
    </app-plugin-item>
  `,
  styles: [],
})
export class PluginComponent implements OnInit {
  plugins = [];
  text: string;

  gotoDetail(id): void {
    this.router.navigateByUrl(`/dashboard-item/${id}`);
  }

  constructor(
    private router: Router,
    private service: PluginService
    ) {}

  ngOnInit(): void {
    this.service.getAllPlugins().subscribe(e => {
      this.plugins = e.mostPopular;
    });
  }
}
