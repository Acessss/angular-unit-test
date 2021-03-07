import { Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  getTitle(): string {
    return this.valueSer.getTitle();
  }

  constructor(private valueSer: ValueService) { }
}
