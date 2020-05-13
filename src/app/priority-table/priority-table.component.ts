import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import Priority from '../priority';
import {Store} from '@ngrx/store';
import {AppState} from '../store/main.reducer';
import {
  addedPriority,
  changedPriorityRelativeValue,
  exitPriorityEditingMode,
  enterPriorityEditingMode
} from '../store/main.actions';

@Component({
  selector: 'app-priority-table',
  templateUrl: './priority-table.component.html',
  styleUrls: ['./priority-table.component.scss']
})
export class PriorityTableComponent implements OnInit, AfterViewInit {
  public static readonly PRIORITY_INTERSECTION_TEXT: string = 'Критерій';
  public static readonly ADD_PRIORITY_TEXT: string = 'Додати пріорітет';

  public priorities: Observable<Priority[]> = this.store
    .select(state => Array.from(state.mainState.priorities.values()));

  public editingPriority: {
    from: Priority,
    to: Priority
  } | null = null;

  @ViewChildren('currentEditingInput')
  input: QueryList<ElementRef>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(state => state.mainState.editingPriority).subscribe(value => this.editingPriority = value);
  }

  ngAfterViewInit(): void {
    this.input.changes.subscribe(_ => {
      if (this.input.length !== 0) {
        this.input.first.nativeElement.focus();
      }
    });
  }

  public addPriority(event: any) {
    this.store.dispatch(addedPriority({newPriorityTitle: event.target.value}));
    event.target.value = '';
  }

  public editRelativePriorityValue(newValue: string) {
    const newValueParsed = +newValue;

    this.store.dispatch(changedPriorityRelativeValue({
      from: this.editingPriority.from,
      to: this.editingPriority.to,
      newValue: newValueParsed,
    }));

    this.store.dispatch(exitPriorityEditingMode());
  }

  public enterPriorityEditingMode(rowPriority: Priority, columnPriority: Priority) {
    this.store.dispatch(enterPriorityEditingMode({from: rowPriority, to: columnPriority}));
  }

  public checkEditingMode(from: Priority, to: Priority) {
    return this.editingPriority !== null &&
      this.editingPriority.from === from &&
      this.editingPriority.to === to;
  }

  public transformEditValue(): string {
    const value = this.editingPriority.from.comparisons.get(this.editingPriority.to);

    if (value === null) {
      return '';
    }

    return value.toString();
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
