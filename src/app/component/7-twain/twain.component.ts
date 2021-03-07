import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';
import { TwainService } from './twain.service';

export class Quote {
  id: number;
  providerTitle: string;
}

@Component({
  selector: 'app-twain',
  template: `
    <p class="twain"><i>{{quote | async}}</i></p>
    <button (click)="getQuote()">Next quote</button>
    <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>`,
  styles: [
    `.twain { font-style: italic; } .error { color: red; }`
  ]

})
export class TwainComponent implements OnInit {
  errorMessage: string;
  quote: Observable<string>;

  constructor(private twainService: TwainService) {}

  ngOnInit(): void {
    this.getQuote();
  }

  getQuote(): void {
    this.errorMessage = '';
    /**
     * 从注入的 TwainService 中获取名言。该在服务能返回第一条名言之前，该服务会先返回一个占位流（'...'）
     * catchError 会拦截服务错误，准备一条错误信息，并在流的成功通道上返回占位值。它必须等一拍（tick）才能设置 errorMessage，以免在同一个更改检测周期内更新此消息两次
     */
    this.quote = this.twainService.getQuote().pipe(
      startWith('...'),
      catchError( (err: any) => {
        // Wait a turn because errorMessage already set once this turn
        setTimeout(() => this.errorMessage = err.message || err.toString());
        return of('...'); // reset message to placeholder
      })
    );
  }

}
