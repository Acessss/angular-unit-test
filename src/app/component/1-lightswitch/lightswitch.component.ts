import { Component } from '@angular/core';

@Component({
  selector: 'app-lightswitch',
  template: ` <button (click)="clicked()">Click me!</button>
    <span>{{ message }}</span>`,
})
export class LightswitchComponent {
  isOn = false;

  clicked(): void {
    this.isOn = !this.isOn;
  }

  get message(): string {
    return `The light is ${this.isOn ? 'On' : 'Off'}`;
  }
}
