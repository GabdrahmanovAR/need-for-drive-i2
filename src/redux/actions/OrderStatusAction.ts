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
import { deleteOrderById, getOrderById, registerOrder } from '../../api-request/apiRequest';
import { IOrderStatus, IOrderStatusResponse } from '../../types/api';
import { changeOrderConfirmAction } from './OrderConfirmAction';
import { clearOrderInfoAction } from './OrderInfoAction';
import { resetRadioBtnAction } from './RadioButtonAction';
import { resetTabsStateAction } from './OrderStepAction';

const loadingOrderStart = (): IOrderStatusActionType => ({
  type: UPLOADING_ORDER_START,
});

const loadingOrderEnd = (): IOrderStatusActionType => ({
  type: UPLOADING_ORDER_END,
});

const getOrderStatusData = (data: IOrderStatusResponse): IOrderStatusActionType => ({
  type: GET_ORDER_STATUS_DATA,
  statusInfo: {
    id: data.id,
    car: {
      name: data.carId.name,
      image: data.carId.thumbnail.path,
      number: data.carId.number,
    },
    color: data.color,
    dateTo: data.dateTo,
    dateFrom: data.dateFrom,
    isFullTank: data.isFullTank,
    isNeedChildChair: data.isNeedChildChair,
    isRightWheel: data.isRightWheel,
    price: data.price,
    rate: data.rateId.rateTypeId.name,
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
