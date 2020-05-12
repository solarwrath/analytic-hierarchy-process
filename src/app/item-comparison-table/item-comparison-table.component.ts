import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/main.reducer';
import {Observable} from 'rxjs';
import Priority from '../priority';
import {addedComparedItem, changedComparedItemRelativeValue} from '../store/main.actions';
import ComparedItem from '../compared-item';

@Component({
  selector: 'app-item-comparison-table',
  templateUrl: './item-comparison-table.component.html',
  styleUrls: ['./item-comparison-table.component.scss']
})
export class ItemComparisonTableComponent {
  public static readonly ADD_COLUMN_TEXT: string = 'Додати продукт';

  @Input()
  public priority: Priority;

  public comparedItems: Observable<ComparedItem[]> = this.store.select(state => Array.from(state.mainState.comparedItems.values()));

  constructor(private store: Store<AppState>) {
  }

  public addColumn(event: any) {
    this.store.dispatch(addedComparedItem({newItemTitle: event.target.value}));
    event.target.value = '';
  }

  public tableCellEdit(event: any, from: ComparedItem, to: ComparedItem) {
    const newValue = +event.target.textContent;
    this.store.dispatch(changedComparedItemRelativeValue({from, to, priority: this.priority, newValue}));
  }

  // To use static variable in template, binds instance reference
  public get STATIC_ADD_COLUMN_TEXT(): string {
    return ItemComparisonTableComponent.ADD_COLUMN_TEXT;
  }
}