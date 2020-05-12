import {Component} from '@angular/core';
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
  public static readonly PRIORITY_INTERSECTION_TEXT: string = 'Критерій';
  public static readonly ADD_PRIORITY_TEXT: string = 'Додати пріорітет';

  public priorities: Observable<Priority[]> = this.store
    .select(state => Array.from(state.mainState.priorities.values()));

  constructor(private store: Store<AppState>) {
  }

  public addColumn(event: any) {
    this.store.dispatch(addedPriority({newPriorityTitle: event.target.value}));
    event.target.value = '';
  }

  public tableCellEdit(event: any, from: Priority, to: Priority) {
    const newValue = +event.target.textContent;
    this.store.dispatch(changedPriorityRelativeValue({from, to, newValue}));
  }

  // To use static variable in template, binds instance reference
  public get STATIC_PRIORITY_INTERSECTION_TEXT(): string {
    return PriorityTableComponent.PRIORITY_INTERSECTION_TEXT;
  }

  // To use static variable in template, binds instance reference
  public get STATIC_ADD_PRIORITY_TEXT(): string {
    return PriorityTableComponent.ADD_PRIORITY_TEXT;
  }
}
