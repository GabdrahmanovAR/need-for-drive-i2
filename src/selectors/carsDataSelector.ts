import { IState } from '../types/state';

export const carsDataSelector = (state: IState) => ({
  count: state.carsData.count,
  data: state.carsData.data,
  isLoading: state.carsData.isLoading,
});
