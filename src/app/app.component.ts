import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from './store/main.reducer';
import Priority from './priority';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  priorities: Observable<Priority[]> = this.store.select(state => Array.from(state.mainState.priorities.values()));

  constructor(private store: Store<AppState>) {
  }
}
