import {Pipe, PipeTransform} from '@angular/core';
import Priority from './priority';
import ComparedItem from './compared-item';

@Pipe({
  name: 'comparedItemValue',
  pure: false
})
export class ComparedItemValuePipe implements PipeTransform {
  private static readonly ENTER_VALUE_PLACEHOLDER_TEXT = 'Введіть значення';

  transform(rowComparedItem: ComparedItem, colComparedItem: ComparedItem, priority: Priority): string {
    const value = rowComparedItem.comparisons.get(colComparedItem).get(priority);

    if (value === null) {
      return ComparedItemValuePipe.ENTER_VALUE_PLACEHOLDER_TEXT;
    }

    return value.toString();
  }
}
