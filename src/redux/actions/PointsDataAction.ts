import { Dispatch } from 'redux';
import { IPointsDataActionType } from '../../types/actions';
import {
  CHANGE_CITY_COORDS, CHANGE_MARKER_COORDS, LOAD_POINTS_SUCCESS,
} from '../../constants/actions/pointsData';
import { getPickupPoints } from '../../api-request/apiRequest';
import { IPointCityCoordsState, IPointMarkerCoordsState } from '../../types/state';

const loadPointsData = (data: any): IPointsDataActionType => ({
  type: LOAD_POINTS_SUCCESS,
  data,
});

export const getPointsAction = () => async (dispatch: Dispatch) => {
  try {
    const response = await getPickupPoints();
    dispatch(loadPointsData(response.data.data));
  } catch (error) {
    console.log(error);
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
