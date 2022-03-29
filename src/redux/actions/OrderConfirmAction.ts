import { IOrderConfirmActionType } from '../../types/actions';
import { ORDER_CONFIRM_STATE } from '../../constants/actions/orderConfirm';

export const changeOrderConfirmAction = (isActive: boolean): IOrderConfirmActionType => ({
  type: ORDER_CONFIRM_STATE,
  isActive,
});
