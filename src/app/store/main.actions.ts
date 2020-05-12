import {createAction, props} from '@ngrx/store';
import Priority from '../priority';

export const addedPriority = createAction('[Priority] Added priority', props<{ newPriorityTitle: string }>());
export const changedPriorityRelativeValue = createAction('[Priority] Changed priority relative value',
  props<{ from: Priority, to: Priority, newValue: number | null }>());

export const addedComparedItem = createAction('[Item Comparison] Added item to compare', props<{ newItemTitle: string }>());
