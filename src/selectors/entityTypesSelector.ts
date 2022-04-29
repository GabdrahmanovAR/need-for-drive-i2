import { IState } from '../types/state';

export const entityTypesSelector = (state: IState) => ({
  category: state.entityTypes.category,
  isLoading: state.entityTypes.isLoading,
});
