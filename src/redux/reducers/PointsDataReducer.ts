import produce from 'immer';
import { IPointsDataActionType } from '../../types/actions';
import { IPointCityCoordsState, IPointMarkerCoordsState, IPointsDataState } from '../../types/state';
import {
  CHANGE_CITY_COORDS, CHANGE_MARKER_COORDS,
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
  ICities, ICityInfo, IPoint, IPointsData,
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

const cityInitialState: ICityInfo = {
  id: EMPTY_STRING,
  createdAt: 0,
  updatedAt: 0,
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
    updatedData: {} as IPoint,
  },
  cityCoords: [] as IPointCityCoordsState[],
  markerCoords: [] as IPointMarkerCoordsState[],
  isLoading: false,
  cities: {
    data: {
      count: 0,
      data: [] as ICityInfo[],
    },
    selectedCity: cityInitialState,
    changedIndexData: 0,
    cityModalVisible: false,
    updatedData: {} as ICityInfo,
  },
};

const loadPointsData = (draft: IPointsDataState, data?: IPointsData) => {
  draft.points.data = data || {} as IPointsData;
  return draft;
};

const loadCitiesData = (draft: IPointsDataState, cities?: ICities) => {
  draft.cities.data = cities || {} as ICities;
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

const cityModalState = (draft: IPointsDataState, isVisible?: boolean) => {
  draft.cities.cityModalVisible = isVisible || false;
  return draft;
};

const selectedPointData = (draft: IPointsDataState, point?: IPoint, index?: number) => {
  draft.points.selectedPoint = point || {} as IPoint;
  draft.points.changedIndexData = index || 0;
  return draft;
};

const selectedCityData = (draft: IPointsDataState, city?: ICityInfo, index?: number) => {
  draft.cities.selectedCity = city || {} as ICityInfo;
  draft.cities.changedIndexData = index || 0;
  return draft;
};

const clearSelectedPointData = (draft: IPointsDataState) => {
  draft.points.selectedPoint = {} as IPoint;
  draft.points.changedIndexData = 0;
  draft.points.pointModalVisible = false;
  return draft;
};

const clearSelectedCityData = (draft: IPointsDataState) => {
  draft.cities.selectedCity = {} as ICityInfo;
  draft.cities.changedIndexData = 0;
  draft.cities.cityModalVisible = false;
  return draft;
};

const updateCityData = (draft: IPointsDataState, data?: ICityInfo) => {
  if (data) draft.cities.data.data[draft.cities.changedIndexData] = data;
  return draft;
};

const updatePointData = (draft: IPointsDataState, data?: IPoint) => {
  if (data) draft.points.data.data[draft.points.changedIndexData] = data;
  return draft;
};

export default (state = initialState, action: IPointsDataActionType) => produce(
  state,
  (draft: IPointsDataState) => {
    switch (action.type) {
      case LOAD_POINTS_SUCCESS: return loadPointsData(draft, action.points?.data);
      case LOAD_CITIES_SUCCESS: return loadCitiesData(draft, action.cities?.data);
      case SHOW_POINTS_LOADER: return showLoader(draft);
      case HIDE_POINTS_LOADER: return hideLoader(draft);
      case CHANGE_CITY_COORDS: return changeCityCoords(draft, action.cityCoords);
      case CHANGE_MARKER_COORDS: return changeMarkerCoords(draft, action.markerCoords);
      case POINT_MODAL_STATE: return pointModalState(draft, action.points?.pointModalVisible);
      case CITY_MODAL_STATE: return cityModalState(draft, action.cities?.cityModalVisible);
      case SELECTED_POINT_DATA:
        return selectedPointData(draft, action.points?.selectedPoint, action.points?.changedIndexData);
      case SELECTED_CITY_DATA:
        return selectedCityData(draft, action.cities?.selectedCity, action.cities?.changedIndexData);
      case CLEAR_SELECTED_POINT_DATA: return clearSelectedPointData(draft);
      case CLEAR_SELECTED_CITY_DATA: return clearSelectedCityData(draft);
      case UPDATE_CITY_DATA: return updateCityData(draft, action.cities?.updatedData);
      case UPDATE_POINT_DATA: return updatePointData(draft, action.points?.updatedData);
      default: return state;
    }
  },
);
