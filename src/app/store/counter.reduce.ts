import {createReducer, on} from '@ngrx/store';
import {increment, decrement, reset, addedPriority} from './counter.actions';

export interface AppState {
  counterState: State;
}

export interface State {
  counter: number;
  priorities: string[];
}

export const initialState: State = {
  counter: 0,
  priorities: ['Whatever']
};

const _counterReducer = createReducer(initialState,
  on(increment, state => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, state => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, state => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(addedPriority, (state => {
    return {
      ...state,
      priorities: [...state.priorities, 'aa']
    };
  }))
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
