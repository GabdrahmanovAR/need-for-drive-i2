import produce from 'immer';
import { IAdvancedTabState } from '../../types/state';
import { EMPTY_STRING } from '../../constants/common';
import { IAdvancedTabActionType } from '../../types/actions';
import { SET_END_DATE, SET_START_DATE } from '../../constants/actions/advancedTab';

const initialState: IAdvancedTabState = {
  startDay: EMPTY_STRING,
  endDay: EMPTY_STRING,
};

const setStartDay = (draft: IAdvancedTabState, startDay?: string) => {
  draft.startDay = startDay || EMPTY_STRING;
  return draft;
};

const setEndDay = (draft: IAdvancedTabState, endDay?: string) => {
  draft.endDay = endDay || EMPTY_STRING;
  return draft;
};

export default (state = initialState, action: IAdvancedTabActionType) => produce(
  state,
  (draft: IAdvancedTabState) => {
    switch (action.type) {
      case SET_START_DATE: return setStartDay(draft, action.startDay);
      case SET_END_DATE: return setEndDay(draft, action.endDay);
      default: return state;
    }
  },
);
