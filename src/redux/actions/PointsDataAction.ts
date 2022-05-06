import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { IPointsDataActionType } from '../../types/actions';
import {
  CHANGE_CITY_COORDS,
  CHANGE_MARKER_COORDS,
  CLEAR_SELECTED_POINT_DATA,
  HIDE_POINTS_LOADER,
  LOAD_CITIES_SUCCESS,
  LOAD_POINTS_SUCCESS,
  POINT_MODAL_STATE,
  SELECTED_POINT_DATA,
  SHOW_POINTS_LOADER,
} from '../../constants/actions/pointsData';
import {
  changePoint, deletePoint, getCities, getPickupPoints,
} from '../../api-request/apiRequest';
import { IPointCityCoordsState, IPointMarkerCoordsState } from '../../types/state';
import { ICities, IPoint, IPointsData } from '../../types/api';
import { successfullSaveState } from './SuccessfullSaveAction';
import { POINT_DELETED, POINT_SAVED } from '../../constants/common';

const loadPointsData = (data: IPointsData): IPointsDataActionType => ({
  type: LOAD_POINTS_SUCCESS,
  points: data,
});

const loadCitiesData = (cities: ICities): IPointsDataActionType => ({
  type: LOAD_CITIES_SUCCESS,
  cities,
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
    const responsePoints: AxiosResponse<IPointsData> = await getPickupPoints();
    dispatch(loadPointsData(responsePoints.data));

    if (trigger === 'admin') {
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
  pointModalVisible: isVisible,
});

export const selectedPointACtion = (point: IPoint, index: number): IPointsDataActionType => ({
  type: SELECTED_POINT_DATA,
  selectedPoint: {
    index,
    point,
  },
});

export const clearSelectedPointAction = (): IPointsDataActionType => ({
  type: CLEAR_SELECTED_POINT_DATA,
});

export const changePointsAction = (pointId: string, name: string, address: string, cityId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await changePoint(pointId, name, address, cityId);
    console.log(response.data);
    if (response.status === 200) dispatch(successfullSaveState(POINT_SAVED, true));
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
