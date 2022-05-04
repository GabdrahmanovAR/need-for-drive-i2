import { Dispatch } from 'redux';
import { IPointsDataActionType } from '../../types/actions';
import {
  CHANGE_CITY_COORDS, CHANGE_MARKER_COORDS, HIDE_POINTS_LOADER, LOAD_CITIES_SUCCESS, LOAD_POINTS_SUCCESS, SHOW_POINTS_LOADER,
} from '../../constants/actions/pointsData';
import { getCities, getPickupPoints } from '../../api-request/apiRequest';
import { IPointCityCoordsState, IPointMarkerCoordsState } from '../../types/state';
import { ICities } from '../../types/api';

const loadPointsData = (data: any): IPointsDataActionType => ({
  type: LOAD_POINTS_SUCCESS,
  data,
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
    const responsePoints = await getPickupPoints();
    dispatch(loadPointsData(responsePoints.data.data));

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
