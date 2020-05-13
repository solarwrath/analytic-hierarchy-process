import {Pipe, PipeTransform} from '@angular/core';
import ComparedItem from './compared-item';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'bestItemsOutput'
})
export class BestItemsOutputPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {

  }

  transform(items: ComparedItem[]): SafeHtml {
    if (items.length === 1) {
      return this.sanitizer.bypassSecurityTrustHtml(`Найкращим варіантом є: <strong>${items[0].title}</strong>`);
    }

    return this.sanitizer.bypassSecurityTrustHtml(`Найкращими варіантами є: <strong>${items.map(item => item.title).join(',')}</strong>`);
  }
}
