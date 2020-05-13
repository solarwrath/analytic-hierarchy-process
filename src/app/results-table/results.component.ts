import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/main.reducer';
import ComparedItem from '../compared-item';
import Criteria from '../criteria';
import {findBestItems} from '../computations/analytic-hierarchy-process';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent implements OnInit {
  public priorities: Criteria[];
  public comparedItems: ComparedItem[];
  public bestItems: ComparedItem[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(state => Array.from(state.mainState.priorities.values()))
      .subscribe(priorities => this.priorities = priorities);
    this.store.select(state => Array.from(state.mainState.comparedItems.values()))
      .subscribe(comparedItems => this.comparedItems = comparedItems);
  }

  public findBestItems(): ComparedItem[] {
    this.bestItems = findBestItems(this.comparedItems, this.priorities);
    return this.bestItems;
  }
}
