import { Pipe, PipeTransform } from '@angular/core';
import { resourceLimits } from 'worker_threads';

/* In the previous state (commit), the filter would not work if you filter for 'stable'
 * and then clicked to add new servers. That's because the "pure" Angular pipes are only
 * re-evaluated when on input changes, and not on any data change. This is by design, in
 * order not to create performance issues. But for demonstration, this behavior can be
 * forced by making "pure" as false. */
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: unknown, filterString: string, propName: string): unknown {
    if (value.length === 0 || filterString.length === 0) {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
