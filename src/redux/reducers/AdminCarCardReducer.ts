import produce from 'immer';
import { ADMIN_CAR_CARD_STATE_CHANGE } from '../../constants/actions/adminCarCard';
import { EMPTY_STRING } from '../../constants/common';
import { IAdminCarCardActionType } from '../../types/actions';
import { ICarInfoData } from '../../types/api';
import { IAdminCarCardState } from '../../types/state';

const initialState: IAdminCarCardState = {
  cardState: 'create',
  data: {} as ICarInfoData,
};

const adminCarCardState = (draft: IAdminCarCardState, cardState?: string, data?: ICarInfoData) => {
  draft.cardState = cardState || EMPTY_STRING;
  draft.data = data || {} as ICarInfoData;
  return draft;
};

export default (state = initialState, action: IAdminCarCardActionType) => produce(
  state,
  (draft: IAdminCarCardState) => {
    switch (action.type) {
      case ADMIN_CAR_CARD_STATE_CHANGE: return adminCarCardState(draft, action.cardState, action.data);
      default: return state;
    }
  },
);
