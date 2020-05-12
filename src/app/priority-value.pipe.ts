import {Pipe, PipeTransform} from '@angular/core';
import Priority from './priority';

@Pipe({
  name: 'priorityValue',
  pure: false
})
export class PriorityValuePipe implements PipeTransform {
  private static readonly ENTER_VALUE_PLACEHOLDER_TEXT = 'Введіть значення';

  transform(rowPriority: Priority, colPriority: Priority): string {
    const value = rowPriority.comparisons.get(colPriority);

    if (value === null) {
      return PriorityValuePipe.ENTER_VALUE_PLACEHOLDER_TEXT;
    }

    return value.toString();
  }
}
