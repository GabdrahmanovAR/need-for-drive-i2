import produce from 'immer';
import { IOrderStepState } from '../../types/state';
import { IOrderStepActionType } from '../../types/actions';
import {
  ADVANCED_TAB_COMPLETED,
  LOCATION_TAB_COMPLETED,
  MODEL_TAB_COMPLETED,
  RESET_TABS_STATE,
} from '../../constants/actions/orderStep';
import { EMPTY_STRING } from '../../constants/common';

export const orderStepInitialState: IOrderStepState = {
  locationTabCompleted: false,
  modelTabCompleted: false,
  advancedTabCompleted: false,
  activeTab: EMPTY_STRING,
};

const changeLocTabState = (draft: IOrderStepState, isCompleted?: boolean) => {
  draft.locationTabCompleted = isCompleted || false;
  return draft;
};

const changeModelTabState = (draft: IOrderStepState, isCompleted?: boolean) => {
  draft.modelTabCompleted = isCompleted || false;
  return draft;
};

const changeAdvTabState = (draft: IOrderStepState, isCompleted?: boolean) => {
  draft.advancedTabCompleted = isCompleted || false;
  return draft;
};

const resetTabsState = (draft: IOrderStepState) => {
  draft = orderStepInitialState;
  return draft;
};

export default (state = orderStepInitialState, action: IOrderStepActionType) => produce(
  state,
  (draft: IOrderStepState) => {
    switch (action.type) {
      case LOCATION_TAB_COMPLETED: return changeLocTabState(draft, action.locationTabCompleted);
      case MODEL_TAB_COMPLETED: return changeModelTabState(draft, action.modelTabCompleted);
      case ADVANCED_TAB_COMPLETED: return changeAdvTabState(draft, action.advancedTabCompleted);
      case RESET_TABS_STATE: return resetTabsState(draft);
      default: return state;
    }
  },
);
