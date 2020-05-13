import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/main.reducer';
import {Observable} from 'rxjs';
import Priority from '../priority';
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
  styleUrls: ['./item-comparison-table.component.scss']
})
export class ItemComparisonTableComponent implements OnInit, AfterViewInit {
  public static readonly ADD_COLUMN_TEXT: string = 'Додати продукт';

  @Input()
  public priority: Priority;

  public comparedItems: Observable<ComparedItem[]> = this.store.select(state => Array.from(state.mainState.comparedItems.values()));

  public editingComparedItem: {
    from: ComparedItem,
    to: ComparedItem,
    priority: Priority
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
    const newValueParsed = +newValue;

    this.store.dispatch(changedComparedItemRelativeValue({
      from: this.editingComparedItem.from,
      to: this.editingComparedItem.to,
      priority: this.priority,
      newValue: newValueParsed,
    }));

    this.store.dispatch(exitItemEditingMode());
  }

  public enterComparedItemEditingMode(from: ComparedItem, to: ComparedItem) {
    this.store.dispatch(enterItemEditingMode({from, to, priority: this.priority}));
  }

  public checkEditingMode(from: ComparedItem, to: ComparedItem) {
    return this.editingComparedItem !== null &&
      this.editingComparedItem.from === from &&
      this.editingComparedItem.to === to &&
      this.editingComparedItem.priority === this.priority;
  }

  public transformEditValue(): string {
    const value = this.editingComparedItem.from.comparisons.get(this.editingComparedItem.to).get(this.priority);

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
