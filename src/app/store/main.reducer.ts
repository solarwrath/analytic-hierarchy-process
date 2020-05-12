import {createReducer, on} from '@ngrx/store';
import {addedPriority, changedPriorityRelativeValue} from './main.actions';
import Priority from '../priority';

export interface AppState {
  mainState: State;
}

export interface State {
  priorities: Map<string, Priority>;
}

export const initialState: State = {
  priorities: new Map<string, Priority>(),
};

// tslint:disable-next-line:variable-name
const _mainReducer = createReducer(
  initialState,
  on(addedPriority, ((state, {newPriorityTitle}) => {

    const copiedPriorities = new Map<string, Priority>(state.priorities);

    // @ts-ignore
    const newPriority: Priority = {
      title: newPriorityTitle
    };

    for (const priority of copiedPriorities.values()) {
      priority[newPriorityTitle] = null;
      newPriority[priority.title] = null;
    }

    copiedPriorities.set(newPriorityTitle, newPriority);

    return {
      ...state,
      priorities: copiedPriorities
    };
  })),
  on(changedPriorityRelativeValue, ((state, {from, to, newValue}) => {
      const copiedPriorities = new Map<string, Priority>(state.priorities);

      const copiedFrom = {
        ...copiedPriorities.get(from.title),
      };
      copiedPriorities.set(from.title, copiedFrom);

      const copiedTo = {
        ...copiedPriorities.get(to.title),
      };
      copiedPriorities.set(to.title, copiedTo);



      if (!Number.isNaN(newValue) && Number.isFinite(newValue)) {
        copiedFrom[to.title] = newValue;
        copiedTo[from.title] = 1 / newValue;
      } else {
        copiedFrom[to.title] = null;
        copiedTo[from.title] = null;
      }

      return {
        ...state,
        priorities: copiedPriorities
      };
    })
  )
);

export function mainReducer(state, action) {
  return _mainReducer(state, action);
}
