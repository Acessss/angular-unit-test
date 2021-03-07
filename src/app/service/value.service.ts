import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  getTitle(): string {
    return 'title from valueService';
  }

  constructor() { }
}
