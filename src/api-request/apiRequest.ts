import axios from 'axios';
import moment from 'moment';
import * as api from '../constants/api';
import { IOrderInfoState } from '../types/state';
import { randomHash } from '../utils/RandomHash';

const apiDB = axios.create({
  baseURL: api.BASE_URL,
  headers: {
    [api.APP_ID_FIELD]: api.APP_ID_VALUE,
  },
});

export const getPickupPoints = () => apiDB.get(api.POINT_URL);

export const getCities = () => apiDB.get(api.CITY_URL);

export const getCars = (page: string, limit: string) => apiDB.get(`${api.CARS_URL}?page=${page}&limit=${limit}`);

export const getRate = () => apiDB.get(api.RATE_URL);

export const registerOrder = (orderInfo: IOrderInfoState) => apiDB.post(api.ORDER_URL, {
  orderStatusId: { id: '5e26a191099b810b946c5d89' },
  cityId: { id: orderInfo.location.cityId },
  pointId: { id: orderInfo.location.markerId },
  carId: { id: orderInfo.car.id },
  color: orderInfo.car.currentColor,
  dateFrom: moment(orderInfo.car.rentalDuration.from).valueOf(),
  dateTo: moment(orderInfo.car.rentalDuration.to).valueOf(),
  rateId: { id: orderInfo.car.tariffId },
  price: orderInfo.car.totalCost,
  isFullTank: orderInfo.car.fullTank,
  isNeedChildChair: orderInfo.car.babyChair,
  isRightWheel: orderInfo.car.rightHandDrive,
});

export const getOrderById = (orderId: string) => apiDB.get(`${api.ORDER_URL}/${orderId}`);

export const deleteOrderById = (orderId: string) => apiDB.delete(`${api.ORDER_URL}/${orderId}`);

const apiAuth = axios.create({
  baseURL: api.BASE_URL,
  headers: {
    [api.APP_ID_FIELD]: api.APP_ID_VALUE,
    Authorization: `Basic ${btoa(`${randomHash()}:${api.SECRET_KEY}`)}`,
    'Content-Type': 'application/json',
  },
});

apiAuth.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error),
);

export const authorizationRequest = (username: string, password: string) => apiAuth.post(api.AUTHORIZATION_URL, {
  username,
  password,
});

const apiDBWithToken = axios.create({
  baseURL: api.BASE_URL,
  headers: {
    [api.APP_ID_FIELD]: api.APP_ID_VALUE,
  },
});

apiDBWithToken.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('auth-token');
      window.location.href = '#/admin/login';
    }
    return Promise.reject(error);
  },
);

export const adminGetCarOrder = (page: number) => apiDBWithToken.get(`${api.ORDER_URL}?page=${5420 + page}&limit=1`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
  },
});
