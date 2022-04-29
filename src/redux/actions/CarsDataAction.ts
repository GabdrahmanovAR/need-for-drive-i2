import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { ICarsDataActionType } from '../../types/actions';
import {
  HIDE_CARS_LOADER, LOAD_ALL_CARS_SUCCESS, LOAD_CARS_SUCCESS, SHOW_CARS_LOADER,
} from '../../constants/actions/carsData';
import { getCars } from '../../api-request/apiRequest';
import { ICarsData } from '../../types/api';

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

// const getAllCars = async (): Promise<ICarsData> => {
//   let page = 0;
//   let response: AxiosResponse<ICarsData> = await getCars(page.toString(), '10');
//   const fullResponse: ICarsData = response.data;
//   do {
//     page += 1;
//     // eslint-disable-next-line no-await-in-loop
//     response = await getCars(page.toString(), '10');
//     fullResponse.data.push(...response.data.data);
//   } while (fullResponse.data.length !== response.data.count);
//   return fullResponse;
// };

// export const getAllCarsAction = () => async (dispatch: Dispatch) => {
//   dispatch(showCarsLoader());
//   try {
//     const response: Promise<ICarsData> = getAllCars();
//     dispatch(loadAllCarsData((await response)));
//   } catch (error) {
//     console.log(error);
//   } finally {
//     dispatch(hideCarsLoader());
//   }
// };
