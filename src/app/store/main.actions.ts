import {createAction, props} from '@ngrx/store';
import Criteria from '../criteria';
import ComparedItem from '../compared-item';

export const addedCriteria = createAction('[Criteria] Added criteria', props<{ newCriteriaTitle: string }>());

export const enterCriteriaEditingMode = createAction(
  '[Criteria] Started editing criteria cell',
  props<{ from: Criteria, to: Criteria }>()
);
export const exitCriteriaEditingMode = createAction('[Criteria] Finished editing criteria cell');

export const changedCriteriaRelativeValue = createAction(
  '[Criteria] Changed criteria relative value',
  props<{ from: Criteria, to: Criteria, newValue: number | null }>()
);


export const addedComparedItem = createAction('[Item Comparison] Added item to compare', props<{ newItemTitle: string }>());

export const enterItemEditingMode =
  createAction(
    '[Item Comparison] Started editing compared item cell',
    props<{ from: ComparedItem, to: ComparedItem, criteria: Criteria }>()
  );
export const exitItemEditingMode = createAction('[Item Comparison] Finished editing compared item cell');

export const changedComparedItemRelativeValue = createAction(
  '[Item Comparison] Changed compared item relative value',
  props<{ from: ComparedItem, to: ComparedItem, criteria: Criteria, newValue: number | null }>()
);
