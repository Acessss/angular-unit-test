import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-pipe',
  template: `
    <input type="text" [(ngModel)]="title">
    <span>{{ title | titleCase }}</span>
    <input id="myInput" type="text" [(ngModel)]="myInputValue">
    <span id="myInputUpper">{{ myInputValue | titleCase }}</span>

  `,
  styles: [
  ]
})
export class TestPipeComponent {
  title = 'as sd';
  myInputValue = 'aaa';
}
