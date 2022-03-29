import produce from 'immer';
import { IOrderStatusInfoState, IOrderStatusState } from '../../types/state';
import { IOrderStatusActionType } from '../../types/actions';
import {
  DELETE_ORDER_STATUS_DATA,
  GET_ORDER_STATUS_DATA,
  UPLOADING_ORDER_END,
  UPLOADING_ORDER_START,
} from '../../constants/actions/orderStatus';
import { EMPTY_STRING } from '../../constants/common';

const initialState: IOrderStatusState = {
  loading: false,
  statusInfo: {
    car: {
      name: EMPTY_STRING,
      number: EMPTY_STRING,
      image: EMPTY_STRING,
    },
    cityName: EMPTY_STRING,
    color: EMPTY_STRING,
    dateFrom: 0,
    dateTo: 0,
    id: EMPTY_STRING,
    isFullTank: false,
    isNeedChildChair: false,
    isRightWheel: false,
    pointName: EMPTY_STRING,
    price: 0,
    rate: EMPTY_STRING,
  },
};

const uploadingStart = (draft: IOrderStatusState) => {
  draft.loading = true;
  return draft;
};

const uploadingEnd = (draft: IOrderStatusState) => {
  draft.loading = false;
  return draft;
};

const getOrderStatusData = (draft: IOrderStatusState, data?: IOrderStatusInfoState) => {
  if (data) {
    draft.statusInfo = data;
  }
  return draft;
};

const deleteOrderStatusData = (draft: IOrderStatusState) => {
  draft.statusInfo = initialState.statusInfo;
  return draft;
};

export default (state = initialState, action: IOrderStatusActionType) => produce(
  state,
  (draft: IOrderStatusState) => {
    switch (action.type) {
      case UPLOADING_ORDER_START: return uploadingStart(draft);
      case UPLOADING_ORDER_END: return uploadingEnd(draft);
      case GET_ORDER_STATUS_DATA: return getOrderStatusData(draft, action.statusInfo);
      case DELETE_ORDER_STATUS_DATA: return deleteOrderStatusData(draft);
      default: return state;
    }
  },
);
