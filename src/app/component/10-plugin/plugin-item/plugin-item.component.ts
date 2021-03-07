import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../2-dashboard-hero/dashboard-hero.component';

@Component({
  selector: 'app-plugin-item',
  template: `
    <div class="plugin" (click)="click()">
      {{ plugin.title | uppercase }}
    </div>
    <ng-container *ngIf="plugin.intro">
      {{ plugin.intro }}
      <br />
    </ng-container>

    <div class="img">imgName: {{ plugin.imgUrl | uppercase }}</div>
  `,
  styles: [],
})
export class PluginItemComponent {
  @Input() plugin: any;
  @Output() selected = new EventEmitter<Hero>();

  click(): void {
    this.selected.emit(this.plugin);
  }

  constructor() {}

}
