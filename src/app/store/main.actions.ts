import {createAction, props} from '@ngrx/store';

export const addedPriority = createAction('[Priority] Added priority', props<{ newPriorityTitle: string }>());
