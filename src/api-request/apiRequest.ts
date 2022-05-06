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

export const getCategory = () => apiDB.get(api.CATEGORY_URL);

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

//-----------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------

export const changeRatePrice = (rateId: string, rateTypeId: string, price: number) => (
  apiDB.put(`${api.RATE_URL}/${rateId}`, {
    rateTypeId: { id: rateTypeId },
    price,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  })
);

export const changeRateType = (rateTypeId: string, name: string, unit: string) => (
  apiDB.put(`${api.RATE_TYPE_URL}/${rateTypeId}`, {
    name,
    unit,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  })
);

export const deleteRate = (rateId: string) => (
  apiDB.delete((`${api.RATE_URL}/${rateId}`), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  })
);

export const deleteRateType = (rateTypeId: string) => (
  apiDB.delete((`${api.RATE_TYPE_URL}/${rateTypeId}`), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  })
);

//-----------------------------------------------------------------------------------------------

export const changeCategory = (categoryId: string, name: string, description: string) => (
  apiDB.put(`${api.CATEGORY_URL}/${categoryId}`, {
    name,
    description,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  })
);

export const deleteCategory = (categoryId: string) => (
  apiDB.delete(`${api.CATEGORY_URL}/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  })
);

//-----------------------------------------------------------------------------------------------

export const changePoint = (pointId: string, name: string, address: string, cityId: string) => (
  apiDB.put(`${api.POINT_URL}/${pointId}`, {
    name,
    cityId: {
      id: cityId,
    },
    address,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  })
);

export const deletePoint = (pointId: string) => (
  apiDB.delete(`${api.POINT_URL}/${pointId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  })
);
