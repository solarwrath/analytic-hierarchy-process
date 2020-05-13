import {Pipe, PipeTransform} from '@angular/core';
import ComparedItem from './compared-item';

@Pipe({
  name: 'bestItemsOutput'
})
export class BestItemsOutputPipe implements PipeTransform {
  transform(items: ComparedItem[]): string {
    if (items.length === 1) {
      return `Найкращим варіантом є: ${items[0].title}`;
    }

    return `Найкращими варіантами є: ${items.map(item => item.title).join(',')}`;
  }
}
