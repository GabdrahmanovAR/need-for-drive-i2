import produce from 'immer';
import { IOrderConfirmState } from '../../types/state';
import { IOrderConfirmActionType } from '../../types/actions';
import { ORDER_CONFIRM_STATE } from '../../constants/actions/orderConfirm';

const initialState: IOrderConfirmState = {
  isActive: false,
};

const changeOrderConfirmState = (draft: IOrderConfirmState, isActive?: boolean) => {
  draft.isActive = isActive || false;
  return draft;
};

export default (state = initialState, action: IOrderConfirmActionType) => produce(
  state,
  (draft: IOrderConfirmState) => {
    switch (action.type) {
      case ORDER_CONFIRM_STATE: return changeOrderConfirmState(draft, action.isActive);
      default: return state;
    }
  },
);
