import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import Criteria from '../criteria';
import {Store} from '@ngrx/store';
import {AppState} from '../store/main.reducer';
import {
  addedCriteria,
  changedCriteriaRelativeValue,
  exitCriteriaEditingMode,
  enterCriteriaEditingMode
} from '../store/main.actions';

@Component({
  selector: 'app-criteria-table',
  templateUrl: './criteria-table.component.html',
})
export class CriteriaTableComponent implements OnInit, AfterViewInit {
  public static readonly ADD_CRITERIA_TEXT: string = 'Додати крітерій';

  public priorities: Observable<Criteria[]> = this.store
    .select(state => Array.from(state.mainState.priorities.values()));

  public editingCriteria: {
    from: Criteria,
    to: Criteria
  } | null = null;

  @ViewChildren('currentEditingInput')
  input: QueryList<ElementRef>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(state => state.mainState.editingCriteria).subscribe(value => this.editingCriteria = value);
  }

  ngAfterViewInit(): void {
    this.input.changes.subscribe(_ => {
      if (this.input.length !== 0) {
        this.input.first.nativeElement.focus();
      }
    });
  }

  public addCriteria(event: any) {
    this.store.dispatch(addedCriteria({newCriteriaTitle: event.target.value}));
    event.target.value = '';
  }

  public editRelativeCriteriaValue(newValue: string) {
    const newValueParsed = +newValue.replace(',', '.');

    this.store.dispatch(changedCriteriaRelativeValue({
      from: this.editingCriteria.from,
      to: this.editingCriteria.to,
      newValue: newValueParsed,
    }));

    this.store.dispatch(exitCriteriaEditingMode());
  }

  public enterCriteriaEditingMode(rowCriteria: Criteria, columnCriteria: Criteria) {
    this.store.dispatch(enterCriteriaEditingMode({from: rowCriteria, to: columnCriteria}));
  }

  public checkEditingMode(from: Criteria, to: Criteria) {
    return this.editingCriteria !== null &&
      this.editingCriteria.from === from &&
      this.editingCriteria.to === to;
  }

  public transformEditValue(): string {
    const value = this.editingCriteria.from.comparisons.get(this.editingCriteria.to);

    if (value === null) {
      return '';
    }

    return value.toString();
  }

  // To use static variable in template, binds instance reference
  public get STATIC_ADD_CRITERIA_TEXT(): string {
    return CriteriaTableComponent.ADD_CRITERIA_TEXT;
  }
}
