import { IState } from '../types/state';

export const advancedTabSelector = (state: IState) => ({
  startDay: state.advancedTab.startDay,
  endDay: state.advancedTab.endDay,
});
