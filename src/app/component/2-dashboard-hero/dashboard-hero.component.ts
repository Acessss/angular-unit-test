import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dashboard-hero',
  template: ``,
})
export class DashboardHeroComponent {

  @Input() hero: Hero;

  @Output() selected = new EventEmitter<Hero>();

  click(): void {
    this.selected.emit(this.hero);
  }
}
