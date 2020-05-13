import {Pipe, PipeTransform} from '@angular/core';
import Criteria from './criteria';

@Pipe({
  name: 'criteriaValue',
  pure: false
})
export class CriteriaValuePipe implements PipeTransform {
  private static readonly ENTER_VALUE_PLACEHOLDER_TEXT = 'Введіть значення';

  transform(rowCriteria: Criteria, colCriteria: Criteria): string {
    const value = rowCriteria.comparisons.get(colCriteria);

    if (value === null) {
      return CriteriaValuePipe.ENTER_VALUE_PLACEHOLDER_TEXT;
    }

    return value.toString();
  }
}
