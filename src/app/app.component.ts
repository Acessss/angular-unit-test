import { Component, OnInit } from '@angular/core';
import { ValueService } from './service/value.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;

  constructor(private valueSer: ValueService) {}

  ngOnInit(): void {
    this.title = this.valueSer.getTitle();
  }
}
