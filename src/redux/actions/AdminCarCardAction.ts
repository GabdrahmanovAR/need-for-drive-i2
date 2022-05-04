import { Dispatch } from 'redux';
import { ADMIN_CAR_CARD_STATE_CHANGE } from '../../constants/actions/adminCarCard';
import { IAdminCarCardActionType } from '../../types/actions';
import { ICarInfoData } from '../../types/api';

const adminCarCard = (cardState: string, data: ICarInfoData): IAdminCarCardActionType => ({
  type: ADMIN_CAR_CARD_STATE_CHANGE,
  cardState,
  data,
});

export const adminCarCardChangeStateAction = (cardState: string, data: ICarInfoData) => (dispatch: Dispatch) => {
  dispatch(adminCarCard(cardState, data));
};
