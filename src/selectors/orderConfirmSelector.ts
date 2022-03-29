import { IState } from '../types/state';

export const orderConfirmSelector = (state: IState) => ({
  isActive: state.orderConfirm.isActive,
});
