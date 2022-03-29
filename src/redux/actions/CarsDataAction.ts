import { Dispatch } from 'redux';
import { ICarsDataActionType } from '../../types/actions';
import { HIDE_CARS_LOADER, LOAD_CARS_SUCCESS, SHOW_CARS_LOADER } from '../../constants/actions/carsData';
import { getCars } from '../../api-request/apiRequest';

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

export const getCarsAction = (page: string, limit: string) => async (dispatch: Dispatch) => {
  dispatch(showCarsLoader());
  try {
    const response = await getCars(page, limit);
    dispatch(loadCarsData(response.data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideCarsLoader());
  }
};
