import produce from 'immer';
import { IPointsDataActionType } from '../../types/actions';
import { IPointCityCoordsState, IPointMarkerCoordsState, IPointsDataState } from '../../types/state';
import {
  CHANGE_CITY_COORDS, CHANGE_MARKER_COORDS,
  HIDE_POINTS_LOADER,
  LOAD_CITIES_SUCCESS,
  LOAD_POINTS_SUCCESS,
  SHOW_POINTS_LOADER,
} from '../../constants/actions/pointsData';
import { ICities, ICityInfo, IPoint } from '../../types/api';

const initialState: IPointsDataState = {
  data: [] as IPoint[],
  cityCoords: [] as IPointCityCoordsState[],
  markerCoords: [] as IPointMarkerCoordsState[],
  isLoading: false,
  cities: {
    count: 0,
    data: [] as ICityInfo[],
  } as ICities,
};

const loadPointsData = (draft: IPointsDataState, data?: IPoint[]) => {
  draft.data = data || [];
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

export default (state = initialState, action: IPointsDataActionType) => produce(
  state,
  (draft: IPointsDataState) => {
    switch (action.type) {
      case LOAD_POINTS_SUCCESS: return loadPointsData(draft, action.data);
      case LOAD_CITIES_SUCCESS: return loadCitiesData(draft, action.cities);
      case SHOW_POINTS_LOADER: return showLoader(draft);
      case HIDE_POINTS_LOADER: return hideLoader(draft);
      case CHANGE_CITY_COORDS: return changeCityCoords(draft, action.cityCoords);
      case CHANGE_MARKER_COORDS: return changeMarkerCoords(draft, action.markerCoords);
      default: return state;
    }
  },
);
