import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PriceFilterService } from '../../services/price-filter.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.css'
})
export class PriceFilterComponent {
  rangeValue: number = 0;

  constructor(private priceFilterService: PriceFilterService) { }

  onRangeChange($event: Event) {
    if ($event.target) {
      const inputElement = $event.target as HTMLInputElement;
      this.rangeValue = +inputElement.value;
      this.priceFilterService.updateRangeValue(this.rangeValue);
    }
  }


}
