import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { ICarsDataActionType } from '../../types/actions';
import {
  HIDE_CARS_LOADER, LOAD_ALL_CARS_SUCCESS, LOAD_CARS_SUCCESS, SHOW_CARS_LOADER,
} from '../../constants/actions/carsData';
import {
  createCar, deleteCar, getCars, updateCar,
} from '../../api-request/apiRequest';
import { ICarsData, ICreateCar } from '../../types/api';
import { successfullSaveState } from './SuccessfullSaveAction';
import { CAR_CREATED, CAR_DELETED, CAR_UPDATED } from '../../constants/common';

const showCarsLoader = (): ICarsDataActionType => ({
  type: SHOW_CARS_LOADER,
});

const hideCarsLoader = (): ICarsDataActionType => ({
  type: HIDE_CARS_LOADER,
});

const loadCarsData = (carsData: any): ICarsDataActionType => ({
  type: LOAD_CARS_SUCCESS,
  data: carsData,
});

const loadCarsDataAdminPart = (carsData: ICarsData): ICarsDataActionType => ({
  type: LOAD_ALL_CARS_SUCCESS,
  dataAdminPart: carsData,
});

export const getCarsAction = (page: string, limit: string) => async (dispatch: Dispatch) => {
  dispatch(showCarsLoader());
  try {
    const response: AxiosResponse<ICarsData> = await getCars(page, limit);
    dispatch(Number(limit) === 5 ? loadCarsDataAdminPart(response.data) : loadCarsData(response.data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideCarsLoader());
  }
};

export const createCarAction = (body: ICreateCar) => async (dispatch: Dispatch) => {
  dispatch(showCarsLoader());
  try {
    const response = await createCar(body);
    if (response.status === 200) dispatch(successfullSaveState(CAR_CREATED, true));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideCarsLoader());
  }
};

export const updateCarAction = (carId: string, body: ICreateCar) => async (dispatch: Dispatch) => {
  dispatch(showCarsLoader());
  try {
    const response = await updateCar(carId, body);
    if (response.status === 200) dispatch(successfullSaveState(CAR_UPDATED, true));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideCarsLoader());
  }
};

export const deleteCarAction = (carId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await deleteCar(carId);
    if (response.status === 200) dispatch(successfullSaveState(CAR_DELETED, true));
  } catch (error) {
    console.log(error);
  }
};
