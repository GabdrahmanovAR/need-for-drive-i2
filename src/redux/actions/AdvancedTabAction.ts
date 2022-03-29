import { IAdvancedTabActionType } from '../../types/actions';
import { SET_END_DATE, SET_START_DATE } from '../../constants/actions/advancedTab';

export const setStartDayAction = (startDay: string): IAdvancedTabActionType => ({
  type: SET_START_DATE,
  startDay,
});

export const setEndDayAction = (endDay: string): IAdvancedTabActionType => ({
  type: SET_END_DATE,
  endDay,
});
