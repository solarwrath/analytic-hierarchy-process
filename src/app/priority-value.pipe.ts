import {Pipe, PipeTransform} from '@angular/core';
import Priority from './priority';
import {PriorityTableComponent} from './priority-table/priority-table.component';

@Pipe({
  name: 'priorityValue',
  pure: false
})
export class PriorityValuePipe implements PipeTransform {

  transform(rowPriority: Priority, colPriority: Priority): string {
    const value = rowPriority[colPriority.title];

    if (value === null) {
      return PriorityTableComponent.ENTER_VALUE_PLACEHOLDER_TEXT;
    }

    return value.toString();
  }
}
