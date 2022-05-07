import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { IPointsDataActionType } from '../../types/actions';
import {
  CHANGE_CITY_COORDS,
  CHANGE_MARKER_COORDS,
  CITY_MODAL_STATE,
  CLEAR_SELECTED_CITY_DATA,
  CLEAR_SELECTED_POINT_DATA,
  HIDE_POINTS_LOADER,
  LOAD_CITIES_SUCCESS,
  LOAD_POINTS_SUCCESS,
  POINT_MODAL_STATE,
  SELECTED_CITY_DATA,
  SELECTED_POINT_DATA,
  SHOW_POINTS_LOADER,
  UPDATE_CITY_DATA,
  UPDATE_POINT_DATA,
} from '../../constants/actions/pointsData';
import {
  changeCity,
  changePoint, deleteCity, deletePoint, getCities, getPickupPoints,
} from '../../api-request/apiRequest';
import { IPointCityCoordsState, IPointMarkerCoordsState } from '../../types/state';
import {
  IChangedCityInfo,
  IChangedPoint,
  ICities, ICityInfo, IPoint, IPointsData,
} from '../../types/api';
import { successfullSaveState } from './SuccessfullSaveAction';
import {
  CITY_DELETED, CITY_SAVED, POINT_DELETED, POINT_SAVED,
} from '../../constants/common';

const loadPointsData = (data: IPointsData): IPointsDataActionType => ({
  type: LOAD_POINTS_SUCCESS,
  points: {
    data,
  },
});

const loadCitiesData = (data: ICities): IPointsDataActionType => ({
  type: LOAD_CITIES_SUCCESS,
  cities: {
    data,
  },
});

const showLoader = (): IPointsDataActionType => ({
  type: SHOW_POINTS_LOADER,
});

const hideLoader = (): IPointsDataActionType => ({
  type: HIDE_POINTS_LOADER,
});

export const getPointsAction = (trigger?: string) => async (dispatch: Dispatch) => {
  dispatch(showLoader());
  try {
    if (!trigger) {
      const responsePoints: AxiosResponse<IPointsData> = await getPickupPoints();
      dispatch(loadPointsData(responsePoints.data));
    }
    if (trigger) {
      const responseCities = await getCities();
      dispatch(loadCitiesData(responseCities.data));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideLoader());
  }
};

export const changeCityCoords = (cityCoords: IPointCityCoordsState[]): IPointsDataActionType => ({
  type: CHANGE_CITY_COORDS,
  cityCoords,
});

export const changeMarkerCoords = (markerCoords: IPointMarkerCoordsState[]): IPointsDataActionType => ({
  type: CHANGE_MARKER_COORDS,
  markerCoords,
});

export const pointModalVisibleAction = (isVisible: boolean): IPointsDataActionType => ({
  type: POINT_MODAL_STATE,
  points: {
    pointModalVisible: isVisible,
  },
});

export const cityModalVisibleAction = (isVisible: boolean): IPointsDataActionType => ({
  type: CITY_MODAL_STATE,
  cities: {
    cityModalVisible: isVisible,
  },
});

export const selectedPointACtion = (point: IPoint, index: number): IPointsDataActionType => ({
  type: SELECTED_POINT_DATA,
  points: {
    selectedPoint: point,
    changedIndexData: index,
  },
});

export const selectedCityAction = (cityInfo: ICityInfo, index: number): IPointsDataActionType => ({
  type: SELECTED_CITY_DATA,
  cities: {
    selectedCity: cityInfo,
    changedIndexData: index,
  },
});

export const clearSelectedPointAction = (): IPointsDataActionType => ({
  type: CLEAR_SELECTED_POINT_DATA,
});

export const clearSelectedCityAction = (): IPointsDataActionType => ({
  type: CLEAR_SELECTED_CITY_DATA,
});

const updateCityData = (cityInfo: ICityInfo): IPointsDataActionType => ({
  type: UPDATE_CITY_DATA,
  cities: {
    updatedData: cityInfo,
  },
});

const updatePointData = (pointInfo: IPoint): IPointsDataActionType => ({
  type: UPDATE_POINT_DATA,
  points: {
    updatedData: pointInfo,
  },
});

export const changePointsAction = (pointId: string, name: string, address: string, cityId: string) => async (dispatch: Dispatch) => {
  try {
    const response: AxiosResponse<IChangedPoint> = await changePoint(pointId, name, address, cityId);
    if (response.status === 200) {
      dispatch(updatePointData(response.data.data));
      dispatch(successfullSaveState(POINT_SAVED, true));
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePointAction = (pointId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await deletePoint(pointId);
    if (response.status === 200) dispatch(successfullSaveState(POINT_DELETED, true));
  } catch (error) {
    console.log(error);
  }
};

export const changeCityAction = (cityId: string, name: string) => async (dispatch: Dispatch) => {
  try {
    const response: AxiosResponse<IChangedCityInfo> = await changeCity(cityId, name);
    if (response.status === 200) {
      dispatch(updateCityData(response.data.data));
      dispatch(successfullSaveState(CITY_SAVED, true));
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCitytAction = (cityId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await deleteCity(cityId);
    if (response.status === 200) {
      dispatch(successfullSaveState(CITY_DELETED, true));
    }
  } catch (error) {
    console.log(error);
  }
};
