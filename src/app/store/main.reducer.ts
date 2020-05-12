import {createReducer, on} from '@ngrx/store';
import {addedComparedItem, addedPriority, changedPriorityRelativeValue} from './main.actions';
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
      title: newPriorityTitle,
      comparisons: new Map<Priority, number | null>()
    };

    for (const priority of copiedPriorities.values()) {
      priority.comparisons.set(newPriority, null);
      newPriority.comparisons.set(priority, null);
    }

    copiedPriorities.set(newPriorityTitle, newPriority);

    return {
      ...state,
      priorities: copiedPriorities
    };
  })),
  on(changedPriorityRelativeValue, ((state, {from, to, newValue}) => {
    if (!Number.isNaN(newValue) && Number.isFinite(newValue)) {
      state.priorities.get(from.title).comparisons.set(to, newValue);
      state.priorities.get(to.title).comparisons.set(from, 1 / newValue);
    } else {
      state.priorities.get(from.title).comparisons.set(to, null);
      state.priorities.get(to.title).comparisons.set(from, null);
    }

    return {
      ...state
    };
  })),
  on(addedComparedItem, ((state, {newItemTitle}) => {
    /*const copiedPriorities = new Map<string, Priority>(state.priorities);

    // @ts-ignore
    const newPriority: Priority = {
      title: newPriorityTitle
    };

    for (const priority of copiedPriorities.values()) {
      priority[newPriorityTitle] = null;
      newPriority[priority.title] = null;
    }

    copiedPriorities.set(newPriorityTitle, newPriority);
*/
    return {
      ...state
    };
  })),
);

export function mainReducer(state, action) {
  return _mainReducer(state, action);
}
