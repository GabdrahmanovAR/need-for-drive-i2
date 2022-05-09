import { IState } from '../types/state';

export const entityTypesSelector = (state: IState) => ({
  category: state.entityTypes.category,
  rates: state.entityTypes.rates,
  statusList: state.entityTypes.statusList,
  isLoading: state.entityTypes.isLoading,
});
