import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'revert'
})
export class RevertPipe implements PipeTransform {

  transform(value: unknown): string {
    let text = <string>value;
    let output = '';
    for (let index = (text.length - 1); index >= 0; index--) {
      output = output + text[index];
    }
    return output;
  }

}
