import { IState } from '../types/state';

export const orderInfoSelector = (state: IState) => ({
  location: state.orderInfo.location,
  car: state.orderInfo.car,
});
