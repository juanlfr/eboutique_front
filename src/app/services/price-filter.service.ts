import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceFilterService {

  constructor() { }
  
  rangeValue: Subject<number> = new BehaviorSubject<number>(0);

  updateRangeValue(newValue: number) {
    this.rangeValue.next(newValue);
  }
}
