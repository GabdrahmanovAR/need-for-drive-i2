import { IState } from '../types/state';

export const carsDataSelector = (state: IState) => ({
  count: state.carsData.count,
  data: state.carsData.data,
  dataAdminPart: state.carsData.dataAdminPart,
  isLoading: state.carsData.isLoading,
});
