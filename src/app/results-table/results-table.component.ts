import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/main.reducer';
import ComparedItem from '../compared-item';
import Priority from '../priority';
import {evaluateGlobalValues} from '../computations/analytic-hierarchy-process';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {
  public priorities: Priority[];
  public comparedItems: ComparedItem[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(state => Array.from(state.mainState.priorities.values()))
      .subscribe(priorities => this.priorities = priorities);
    this.store.select(state => Array.from(state.mainState.comparedItems.values()))
      .subscribe(comparedItems => this.comparedItems = comparedItems);
  }

  public temp(): number[] {
    return evaluateGlobalValues(this.comparedItems, this.priorities);
  }
}
