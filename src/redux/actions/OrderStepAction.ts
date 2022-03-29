import { IOrderStepActionType } from '../../types/actions';
import {
  ADVANCED_TAB_COMPLETED,
  LOCATION_TAB_COMPLETED,
  MODEL_TAB_COMPLETED,
  RESET_TABS_STATE,
} from '../../constants/actions/orderStep';

export const changeLocTabStateAction = (isCompleted?: boolean): IOrderStepActionType => ({
  type: LOCATION_TAB_COMPLETED,
  locationTabCompleted: isCompleted,
});

export const changeModelTabStateAction = (isCompleted?: boolean): IOrderStepActionType => ({
  type: MODEL_TAB_COMPLETED,
  modelTabCompleted: isCompleted,
});

export const changeAdvTabStateAction = (isCompleted?: boolean): IOrderStepActionType => ({
  type: ADVANCED_TAB_COMPLETED,
  advancedTabCompleted: isCompleted,
});

export const resetTabsStateAction = (): IOrderStepActionType => ({
  type: RESET_TABS_STATE,
});
