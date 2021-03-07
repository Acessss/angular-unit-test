import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../2-dashboard-hero/dashboard-hero.component';
import { TwainService } from '../../7-twain/twain.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-item',
  template: `
    <div class="plugin" (click)="click()">
      {{ plugin.title | uppercase }}
    </div>
    <ng-container *ngIf="plugin.intro">
      {{ plugin.intro }}
      <br />
      <button (click)="goBack()">back</button>
    </ng-container>

    <div class="img">imgName: {{ plugin.imgUrl | uppercase }}</div>
  `,
  styles: [],
})
export class DashboardItemComponent implements OnInit {
  @Input() plugin: any;
  @Output() selected = new EventEmitter<Hero>();

  click(): void {
    this.selected.emit(this.plugin);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DashboardService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      if (pmap.get('id')) {
        this.service
          .getPluginDetail(parseInt(pmap.get('id'), 10))
          .subscribe((e) => {
            this.plugin = e;
          });
      }
    });
  }
}
