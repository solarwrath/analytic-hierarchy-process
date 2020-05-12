import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from './store/main.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  priorities: Observable<string[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.priorities = this.store.select(state => {
      return Array.from(state.mainState.priorities.keys());
    });
  }
}
