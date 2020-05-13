import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/main.reducer';
import {Observable} from 'rxjs';
import Criteria from '../criteria';
import {
  addedComparedItem,
  changedComparedItemRelativeValue,
  enterItemEditingMode,
  exitItemEditingMode,
} from '../store/main.actions';
import ComparedItem from '../compared-item';

@Component({
  selector: 'app-item-comparison-table',
  templateUrl: './item-comparison-table.component.html',
})
export class ItemComparisonTableComponent implements OnInit, AfterViewInit {
  public static readonly ADD_COLUMN_TEXT: string = 'Додати варіант';

  @Input()
  public criteria: Criteria;

  public comparedItems: Observable<ComparedItem[]> = this.store.select(state => Array.from(state.mainState.comparedItems.values()));

  public editingComparedItem: {
    from: ComparedItem,
    to: ComparedItem,
    criteria: Criteria
  } | null = null;

  @ViewChildren('currentEditingInput')
  input: QueryList<ElementRef>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(state => state.mainState.editingComparedItem).subscribe(value => this.editingComparedItem = value);
  }

  ngAfterViewInit(): void {
    this.input.changes.subscribe(_ => {
      if (this.input.length !== 0) {
        this.input.first.nativeElement.focus();
      }
    });
  }

  public addComparedItem(event: any) {
    this.store.dispatch(addedComparedItem({newItemTitle: event.target.value}));
    event.target.value = '';
  }

  public editRelativeComparedItemValue(newValue: string) {
    const newValueParsed = +newValue.replace(',', '.');

    this.store.dispatch(changedComparedItemRelativeValue({
      from: this.editingComparedItem.from,
      to: this.editingComparedItem.to,
      criteria: this.criteria,
      newValue: newValueParsed,
    }));

    this.store.dispatch(exitItemEditingMode());
  }

  public enterComparedItemEditingMode(from: ComparedItem, to: ComparedItem) {
    this.store.dispatch(enterItemEditingMode({from, to, criteria: this.criteria}));
  }

  public checkEditingMode(from: ComparedItem, to: ComparedItem) {
    return this.editingComparedItem !== null &&
      this.editingComparedItem.from === from &&
      this.editingComparedItem.to === to &&
      this.editingComparedItem.criteria === this.criteria;
  }

  public transformEditValue(): string {
    const value = this.editingComparedItem.from.comparisons.get(this.editingComparedItem.to).get(this.criteria);

    if (value === null) {
      return '';
    }

    return value.toString();
  }

  // To use static variable in template, binds instance reference
  public get STATIC_ADD_COLUMN_TEXT(): string {
    return ItemComparisonTableComponent.ADD_COLUMN_TEXT;
  }
}
