import {createReducer, on} from '@ngrx/store';
import {
  addedComparedItem,
  addedPriority,
  changedComparedItemRelativeValue,
  changedPriorityRelativeValue, exitPriorityEditingMode,
  enterPriorityEditingMode, enterItemEditingMode, exitItemEditingMode
} from './main.actions';
import Priority from '../priority';
import ComparedItem from '../compared-item';

export interface AppState {
  mainState: State;
}

export interface State {
  priorities: Map<string, Priority>;
  editingPriority: {
    from: Priority,
    to: Priority,
  } | null;
  comparedItems: Map<string, ComparedItem>;
  editingComparedItem: {
    from: ComparedItem,
    to: ComparedItem,
    priority: Priority,
  } | null;
}

export const initialState: State = {
  priorities: new Map<string, Priority>(),
  editingPriority: null,
  comparedItems: new Map<string, ComparedItem>(),
  editingComparedItem: null,
};

// tslint:disable-next-line:variable-name
const _mainReducer = createReducer(
  initialState,
  on(addedPriority, ((state, {newPriorityTitle}) => {
    const copiedPriorities = new Map<string, Priority>(state.priorities);

    const newPriority: Priority = {
      title: newPriorityTitle,
      comparisons: new Map<Priority, number | null>()
    };

    for (const priority of copiedPriorities.values()) {
      priority.comparisons.set(newPriority, null);
      newPriority.comparisons.set(priority, null);
    }

    for (const comparedItem of state.comparedItems.values()) {
      for (const comparedItemComparison of comparedItem.comparisons.values()) {
        comparedItemComparison.set(newPriority, null);
      }
    }

    copiedPriorities.set(newPriorityTitle, newPriority);

    return {
      ...state,
      priorities: copiedPriorities
    };
  })),
  on(changedPriorityRelativeValue, ((state, {from, to, newValue}) => {
    if (!Number.isNaN(newValue) && Number.isFinite(newValue) && newValue !== 0) {
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
    const newItem: ComparedItem = {
      title: newItemTitle,
      comparisons: new Map<ComparedItem, Map<Priority, number | null>>()
    };

    for (const existingItem of state.comparedItems.values()) {
      const existingItemNewComparison = new Map<Priority, number | null>();
      const newItemNewComparison = new Map<Priority, number | null>();

      for (const priority of state.priorities.values()) {
        existingItemNewComparison.set(priority, null);
        newItemNewComparison.set(priority, null);
      }

      existingItem.comparisons.set(newItem, existingItemNewComparison);
      newItem.comparisons.set(existingItem, newItemNewComparison);
    }
    state.comparedItems.set(newItemTitle, newItem);

    return {
      ...state
    };
  })),
  on(changedComparedItemRelativeValue, ((state, {from, to, priority, newValue}) => {
    if (!Number.isNaN(newValue) && Number.isFinite(newValue) && newValue !== 0) {
      state.comparedItems.get(from.title).comparisons.get(to).set(priority, newValue);
      state.comparedItems.get(to.title).comparisons.get(from).set(priority, 1 / newValue);
    } else {
      state.comparedItems.get(from.title).comparisons.get(to).set(priority, null);
      state.comparedItems.get(to.title).comparisons.get(from).set(priority, null);
    }

    return {
      ...state
    };
  })),
  on(enterPriorityEditingMode, (state, {from, to}) => ({
      ...state,
      editingPriority: {
        from,
        to,
      }
    })
  ),
  on(exitPriorityEditingMode, (state) => ({
      ...state,
      editingPriority: null,
    })
  ),
  on(enterItemEditingMode, (state, {from, to, priority}) => ({
      ...state,
      editingComparedItem: {
        from,
        to,
        priority
      }
    })
  ),
  on(exitItemEditingMode, (state) => ({
      ...state,
      editingComparedItem: null,
    })
  ),
);

export function mainReducer(state, action) {
  return _mainReducer(state, action);
}
