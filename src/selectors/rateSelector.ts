import { IState } from '../types/state';

export const rateSelector = (state: IState) => ({
  count: state.rate.count,
  data: state.rate.data,
});
