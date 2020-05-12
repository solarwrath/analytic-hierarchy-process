import {createReducer, on} from '@ngrx/store';
import {addedPriority} from './main.actions';

export interface AppState {
  counterState: State;
}

export interface State {
  priorities: string[];
}

export const initialState: State = {
  priorities: []
};

const _mainReducer = createReducer(initialState,
  on(addedPriority, ((state, {newPriorityTitle}) => {
    return {
      ...state,
      priorities: [...state.priorities, newPriorityTitle]
    };
  }))
);

export function mainReducer(state, action) {
  return _mainReducer(state, action);
}
