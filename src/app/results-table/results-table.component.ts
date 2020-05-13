import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/main.reducer';
import ComparedItem from '../compared-item';
import {Observable} from 'rxjs';
import Priority from '../priority';
import {evaluateEigenvectorComponents} from '../computations/analytic-hierarchy-process';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent {
  public priorities: Observable<Priority[]> = this.store.select(state => Array.from(state.mainState.priorities.values()));
  public comparedItems: Observable<ComparedItem[]> = this.store.select(state => Array.from(state.mainState.comparedItems.values()));

  constructor(private store: Store<AppState>) {
  }

  public temp(priority: Priority): number {
    return evaluateEigenvectorComponents(priority);
  }
}
