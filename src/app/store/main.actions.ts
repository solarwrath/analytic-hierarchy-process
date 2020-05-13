import {createAction, props} from '@ngrx/store';
import Priority from '../priority';
import ComparedItem from '../compared-item';

export const addedPriority = createAction('[Priority] Added priority', props<{ newPriorityTitle: string }>());

export const enterPriorityEditingMode = createAction(
  '[Priority] Started editing priority cell',
  props<{ from: Priority, to: Priority }>()
);
export const exitPriorityEditingMode = createAction('[Priority] Finished editing priority cell');

export const changedPriorityRelativeValue = createAction(
  '[Priority] Changed priority relative value',
  props<{ from: Priority, to: Priority, newValue: number | null }>()
);


export const addedComparedItem = createAction('[Item Comparison] Added item to compare', props<{ newItemTitle: string }>());

export const enterItemEditingMode =
  createAction(
    '[Item Comparison] Started editing compared item cell',
    props<{ from: ComparedItem, to: ComparedItem, priority: Priority }>()
  );
export const exitItemEditingMode = createAction('[Item Comparison] Finished editing compared item cell');

export const changedComparedItemRelativeValue = createAction(
  '[Item Comparison] Changed compared item relative value',
  props<{ from: ComparedItem, to: ComparedItem, priority: Priority, newValue: number | null }>()
);
