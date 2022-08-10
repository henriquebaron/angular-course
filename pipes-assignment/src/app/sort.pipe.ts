import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: unknown, propertyToSort: string): unknown {
    if ((<unknown[]>value).length === 0 || propertyToSort.length === 0) {
      return value;
    }
    let inputArray = <unknown[]>value;
    return inputArray.sort((a, b) => {
      if (a[propertyToSort] > b[propertyToSort]) {
        return 1;
      }
      if (a[propertyToSort] < b[propertyToSort]) {
        return -1;
      }
    });
  }

}
