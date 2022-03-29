import { IState } from '../types/state';

export const orderStatusSelector = (state: IState) => ({
  loading: state.orderStatus.loading,
  statusInfo: state.orderStatus.statusInfo,
});
