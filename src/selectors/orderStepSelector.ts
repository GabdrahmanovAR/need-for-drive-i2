import { IState } from '../types/state';

export const orderStepSelector = (state: IState) => ({
  locationTabCompleted: state.orderStep.locationTabCompleted,
  modelTabCompleted: state.orderStep.modelTabCompleted,
  advancedTabCompleted: state.orderStep.advancedTabCompleted,
  activeTab: state.orderStep.activeTab,
});
