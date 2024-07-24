import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})

/**
 * converts the provided currency to the format $ 0.00
 */
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    return '$ ' + value.toFixed(2);
  }
}
