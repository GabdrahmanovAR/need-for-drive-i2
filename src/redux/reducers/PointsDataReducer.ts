import produce from 'immer';
import { IPointsDataActionType } from '../../types/actions';
import { IPointCityCoordsState, IPointMarkerCoordsState, IPointsDataState } from '../../types/state';
import {
  CHANGE_CITY_COORDS, CHANGE_MARKER_COORDS,
  CLEAR_SELECTED_POINT_DATA,
  HIDE_POINTS_LOADER,
  LOAD_CITIES_SUCCESS,
  LOAD_POINTS_SUCCESS,
  POINT_MODAL_STATE,
  SELECTED_POINT_DATA,
  SHOW_POINTS_LOADER,
} from '../../constants/actions/pointsData';
import {
  ICities, ICityInfo, IPoint,
} from '../../types/api';
import { EMPTY_STRING } from '../../constants/common';

const pointInitialState: IPoint = {
  id: EMPTY_STRING,
  address: EMPTY_STRING,
  cityId: {
    id: EMPTY_STRING,
    name: EMPTY_STRING,
  },
  name: EMPTY_STRING,
};

const initialState: IPointsDataState = {
  points: {
    data: {
      count: 0,
      data: [] as IPoint[],
    },
    selectedPoint: pointInitialState,
    changedIndexData: 0,
    pointModalVisible: false,
  },
  cityCoords: [] as IPointCityCoordsState[],
  markerCoords: [] as IPointMarkerCoordsState[],
  isLoading: false,
  cities: {
    count: 0,
    data: [] as ICityInfo[],
  } as ICities,
};

const loadPointsData = (draft: IPointsDataState, data?: IPoint[]) => {
  draft.points.data.data = data || [];
  return draft;
};

const loadCitiesData = (draft: IPointsDataState, cities?: ICities) => {
  draft.cities = cities || {} as ICities;
  return draft;
};

const showLoader = (draft: IPointsDataState) => {
  draft.isLoading = true;
  return draft;
};

const hideLoader = (draft: IPointsDataState) => {
  draft.isLoading = false;
  return draft;
};

const changeCityCoords = (draft: IPointsDataState, coords?: IPointCityCoordsState[]) => {
  draft.cityCoords = coords || [];
  return draft;
};

const changeMarkerCoords = (draft: IPointsDataState, coords?: IPointMarkerCoordsState[]) => {
  draft.markerCoords = coords || [];
  return draft;
};

const pointModalState = (draft: IPointsDataState, isVisible?: boolean) => {
  draft.points.pointModalVisible = isVisible || false;
  return draft;
};

const selectedPointData = (draft: IPointsDataState, point?: IPoint, index?: number) => {
  draft.points.selectedPoint = point || {} as IPoint;
  draft.points.changedIndexData = index || 0;
  return draft;
};

const clearSelectedPointData = (draft: IPointsDataState) => {
  draft.points.selectedPoint = {} as IPoint;
  draft.points.changedIndexData = 0;
  draft.points.pointModalVisible = false;
  return draft;
};

export default (state = initialState, action: IPointsDataActionType) => produce(
  state,
  (draft: IPointsDataState) => {
    switch (action.type) {
      case LOAD_POINTS_SUCCESS: return loadPointsData(draft, action.points?.data);
      case LOAD_CITIES_SUCCESS: return loadCitiesData(draft, action.cities);
      case SHOW_POINTS_LOADER: return showLoader(draft);
      case HIDE_POINTS_LOADER: return hideLoader(draft);
      case CHANGE_CITY_COORDS: return changeCityCoords(draft, action.cityCoords);
      case CHANGE_MARKER_COORDS: return changeMarkerCoords(draft, action.markerCoords);
      case POINT_MODAL_STATE: return pointModalState(draft, action.pointModalVisible);
      case SELECTED_POINT_DATA:
        return selectedPointData(draft, action.selectedPoint?.point, action.selectedPoint?.index);
      case CLEAR_SELECTED_POINT_DATA: return clearSelectedPointData(draft);
      default: return state;
    }
  },
);
