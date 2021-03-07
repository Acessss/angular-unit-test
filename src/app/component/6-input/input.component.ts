import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <input type="text" [(ngModel)]="title">
    <span>{{ title }}</span>
  `,
  styles: [
  ]
})
export class InputComponent implements OnInit {

  title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
