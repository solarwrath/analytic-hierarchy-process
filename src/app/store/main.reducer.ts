import {createReducer, on} from '@ngrx/store';
import {
  addedComparedItem,
  addedCriteria,
  changedComparedItemRelativeValue,
  changedCriteriaRelativeValue, exitCriteriaEditingMode,
  enterCriteriaEditingMode, enterItemEditingMode, exitItemEditingMode
} from './main.actions';
import Criteria from '../criteria';
import ComparedItem from '../compared-item';

export interface AppState {
  mainState: State;
}

export interface State {
  priorities: Map<string, Criteria>;
  editingCriteria: {
    from: Criteria,
    to: Criteria,
  } | null;
  comparedItems: Map<string, ComparedItem>;
  editingComparedItem: {
    from: ComparedItem,
    to: ComparedItem,
    criteria: Criteria,
  } | null;
}

export const initialState: State = {
  priorities: new Map<string, Criteria>(),
  editingCriteria: null,
  comparedItems: new Map<string, ComparedItem>(),
  editingComparedItem: null,
};

// tslint:disable-next-line:variable-name
const _mainReducer = createReducer(
  initialState,
  on(addedCriteria, ((state, {newCriteriaTitle}) => {
    const copiedPriorities = new Map<string, Criteria>(state.priorities);

    const newCriteria: Criteria = {
      title: newCriteriaTitle,
      comparisons: new Map<Criteria, number | null>()
    };

    for (const criteria of copiedPriorities.values()) {
      criteria.comparisons.set(newCriteria, null);
      newCriteria.comparisons.set(criteria, null);
    }

    for (const comparedItem of state.comparedItems.values()) {
      for (const comparedItemComparison of comparedItem.comparisons.values()) {
        comparedItemComparison.set(newCriteria, null);
      }
    }

    copiedPriorities.set(newCriteriaTitle, newCriteria);

    return {
      ...state,
      priorities: copiedPriorities
    };
  })),
  on(changedCriteriaRelativeValue, ((state, {from, to, newValue}) => {
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
      comparisons: new Map<ComparedItem, Map<Criteria, number | null>>()
    };

    for (const existingItem of state.comparedItems.values()) {
      const existingItemNewComparison = new Map<Criteria, number | null>();
      const newItemNewComparison = new Map<Criteria, number | null>();

      for (const criteria of state.priorities.values()) {
        existingItemNewComparison.set(criteria, null);
        newItemNewComparison.set(criteria, null);
      }

      existingItem.comparisons.set(newItem, existingItemNewComparison);
      newItem.comparisons.set(existingItem, newItemNewComparison);
    }
    state.comparedItems.set(newItemTitle, newItem);

    return {
      ...state
    };
  })),
  on(changedComparedItemRelativeValue, ((state, {from, to, criteria, newValue}) => {
    if (!Number.isNaN(newValue) && Number.isFinite(newValue) && newValue !== 0) {
      state.comparedItems.get(from.title).comparisons.get(to).set(criteria, newValue);
      state.comparedItems.get(to.title).comparisons.get(from).set(criteria, 1 / newValue);
    } else {
      state.comparedItems.get(from.title).comparisons.get(to).set(criteria, null);
      state.comparedItems.get(to.title).comparisons.get(from).set(criteria, null);
    }

    return {
      ...state
    };
  })),
  on(enterCriteriaEditingMode, (state, {from, to}) => ({
      ...state,
      editingCriteria: {
        from,
        to,
      }
    })
  ),
  on(exitCriteriaEditingMode, (state) => ({
      ...state,
      editingCriteria: null,
    })
  ),
  on(enterItemEditingMode, (state, {from, to, criteria}) => ({
      ...state,
      editingComparedItem: {
        from,
        to,
        criteria
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
