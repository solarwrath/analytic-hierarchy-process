import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import Priority from '../priority';
import {Store} from '@ngrx/store';
import {AppState} from '../store/main.reducer';
import {addedPriority, changedPriorityRelativeValue} from '../store/main.actions';

@Component({
  selector: 'app-priority-table',
  templateUrl: './priority-table.component.html',
  styleUrls: ['./priority-table.component.scss']
})
export class PriorityTableComponent {
  public static readonly INTERSECTION_TEXT: string = 'Критерій';

  public get STATIC_INTERSECTION_TEXT(): string {
    return PriorityTableComponent.INTERSECTION_TEXT;
  }

  public static readonly ADD_COLUMN_TEXT: string = 'Додати пріорітет';

  public get STATIC_ADD_COLUMN_TEXT(): string {
    return PriorityTableComponent.ADD_COLUMN_TEXT;
  }

  public static readonly ENTER_VALUE_PLACEHOLDER_TEXT: string = 'Введіть значення!';

  constructor(private store: Store<AppState>) {
  }

  public priorities: Observable<Priority[]> = this.store.select(state => {
    return Array.from(state.mainState.priorities.values());
  });

  tableCellEdit(event: any, from: Priority, to: Priority) {
    const newValue = +event.target.textContent;
    this.store.dispatch(changedPriorityRelativeValue({from, to, newValue}));
  }

  addColumn(event: any) {
    this.store.dispatch(addedPriority({newPriorityTitle: event.target.value}));
    event.target.value = '';
  }
}
