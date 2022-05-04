import { IState } from '../types/state';

export const entityTypesSelector = (state: IState) => ({
  category: state.entityTypes.category,
  rates: state.entityTypes.rates,
  selectedRate: state.entityTypes.selectedRate,
  rateModalVisible: state.entityTypes.rateModalVisible,
  isLoading: state.entityTypes.isLoading,
});
