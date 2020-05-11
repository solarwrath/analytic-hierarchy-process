import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {addedPriority, decrement, increment, reset} from '../store/counter.actions';
import {AppState} from '../store/counter.reduce';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.scss']
})
export class MyCounterComponent implements OnInit {
  counter: Observable<number>;
  priorities: Observable<string[]>;

  constructor(private store: Store<AppState>) {
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  addPriority(){
    this.store.dispatch(addedPriority());
  }

  ngOnInit(): void {
    this.counter = this.store.select(state => state.counterState.counter);
    this.priorities = this.store.select(state => state.counterState.priorities);
  }
}
