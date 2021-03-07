import { Component, OnInit } from '@angular/core';
import { HighlightDirective } from '../highlight.directive';

/**
 * 创建一个人工测试组件来演示应用该指令的所有方法
 */
@Component({
  selector: 'app-test-directive',
  template: `
    <h2 appHighlight="yellow">Something Yellow</h2>
    <h2 appHighlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [appHighlight]="box.value" value="cyan"/>
  `
})
export class TestDirectiveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
