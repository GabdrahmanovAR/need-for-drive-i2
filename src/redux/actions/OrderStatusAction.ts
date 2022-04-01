import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { IOrderStatusActionType } from '../../types/actions';
import {
  DELETE_ORDER_STATUS_DATA,
  GET_ORDER_STATUS_DATA,
  UPLOADING_ORDER_END,
  UPLOADING_ORDER_START,
} from '../../constants/actions/orderStatus';
import { IOrderInfoState } from '../../types/state';
import {
  adminGetCarOrder, deleteOrderById, getOrderById, registerOrder,
} from '../../api-request/apiRequest';
import { IAdminOrderStatusState, IOrderStatus, IOrderStatusResponse } from '../../types/api';
import { changeOrderConfirmAction } from './OrderConfirmAction';
import { clearOrderInfoAction } from './OrderInfoAction';
import { resetRadioBtnAction } from './RadioButtonAction';
import { resetTabsStateAction } from './OrderStepAction';
import { EMPTY_STRING } from '../../constants/common';

const loadingOrderStart = (): IOrderStatusActionType => ({
  type: UPLOADING_ORDER_START,
});

const loadingOrderEnd = (): IOrderStatusActionType => ({
  type: UPLOADING_ORDER_END,
});

const getOrderStatusData = (data: IOrderStatusResponse, count?: number): IOrderStatusActionType => ({
  type: GET_ORDER_STATUS_DATA,
  count,
  statusInfo: {
    id: data.id,
    car: data.carId ? {
      name: data.carId.name,
      image: data.carId.thumbnail.path,
      number: data.carId.number,
      tank: data.carId.tank,
    } : {
      name: EMPTY_STRING,
      image: EMPTY_STRING,
      number: EMPTY_STRING,
      tank: 0,
    },
    color: data.color,
    dateTo: data.dateTo,
    dateFrom: data.dateFrom,
    isFullTank: data.isFullTank,
    isNeedChildChair: data.isNeedChildChair,
    isRightWheel: data.isRightWheel,
    price: data.price,
    rate: data.rateId ? data.rateId.rateTypeId.name : EMPTY_STRING,
    cityName: data.cityId.name,
    pointName: data.pointId.address,
  },
});

export const orderStatusAction = (orderInfo: IOrderInfoState) => async (dispatch: Dispatch) => {
  dispatch(loadingOrderStart());
  try {
    const response: AxiosResponse<IOrderStatus> = await registerOrder(orderInfo);
    localStorage.setItem('orderId', response.data.data.id);
    dispatch(getOrderStatusData(response.data.data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loadingOrderEnd());
    dispatch(changeOrderConfirmAction(false));
  }
};

export const getOrderStatusByIdAction = (orderId: string) => async (dispatch: Dispatch) => {
  dispatch(loadingOrderStart());
  try {
    const response: AxiosResponse<IOrderStatus> = await getOrderById(orderId);
    dispatch(getOrderStatusData(response.data.data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loadingOrderEnd());
  }
};

export const deleteOrderStatusData = (): IOrderStatusActionType => ({
  type: DELETE_ORDER_STATUS_DATA,
});

export const deleteOrderByIdAction = (orderId: string) => async (dispatch: Dispatch) => {
  dispatch(loadingOrderStart());
  try {
    dispatch(deleteOrderStatusData());
    dispatch(clearOrderInfoAction());
    dispatch(resetRadioBtnAction());
    dispatch(resetTabsStateAction());
    const response = await deleteOrderById(orderId);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loadingOrderEnd());
  }
};

export const adminGetCarOrderAction = (page: number) => async (dispatch: Dispatch) => {
  dispatch(loadingOrderStart());
  try {
    const response: AxiosResponse<IAdminOrderStatusState> = await adminGetCarOrder(page);
    dispatch(getOrderStatusData(response.data.data[0], response.data.count));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(loadingOrderEnd());
  }
};
