import { IState } from '../types/state';

export const entityTypesSelector = (state: IState) => ({
  category: state.entityTypes.category,
  rates: state.entityTypes.rates,
  isLoading: state.entityTypes.isLoading,
});
