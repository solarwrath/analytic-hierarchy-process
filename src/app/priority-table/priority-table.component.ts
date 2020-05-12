import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import Priority from '../priority';
import {Store} from '@ngrx/store';
import {AppState} from '../store/main.reducer';
import {addedPriority} from '../store/main.actions';

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

  public prioritiesData: {
    [priorityTitle: string]: Priority;
  } = {};

  public get priorities(): Priority[] {
    return Object.values(this.prioritiesData);
  }

  public prioritiesObservable: BehaviorSubject<Priority[]> = new BehaviorSubject<Priority[]>([]);

  constructor(private store: Store<AppState>) {
  }

  tableCellEdit(event: any, firstPriority: Priority, secondPriority: Priority) {
    const enteredValue = +event.target.textContent;

    if (enteredValue === 0) {
      // TODO Display error
      event.target.textContent = PriorityTableComponent.ADD_COLUMN_TEXT;
    } else if (!Number.isNaN(enteredValue)) {
      firstPriority[secondPriority.title] = enteredValue;
      secondPriority[firstPriority.title] = 1 / enteredValue;
    }
  }

  addColumn(event: any) {
    this.store.dispatch(addedPriority({newPriorityTitle: event.target.value}));

    const newStuff: Priority = {
      title: event.target.value,
    };

    event.target.value = '';

    this.priorities.forEach((priority: Priority) => {
      newStuff[priority.title] = null;
      priority[newStuff.title] = null;
    });

    this.prioritiesData[newStuff.title] = newStuff;
    this.prioritiesObservable.next(this.priorities);
  }

  onSubmit() {
    console.log(this.prioritiesData);
  }
}
