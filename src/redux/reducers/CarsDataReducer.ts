import produce from 'immer';
import { ICarsDataState } from '../../types/state';
import { ICarsDataActionType } from '../../types/actions';
import { HIDE_CARS_LOADER, LOAD_CARS_SUCCESS, SHOW_CARS_LOADER } from '../../constants/actions/carsData';
import { ICarsData } from '../../types/api';

const initialState: ICarsDataState = {
  count: 0,
  data: [],
  isLoading: false,
};

const showLoader = (draft: ICarsDataState) => {
  draft.isLoading = true;
  return draft;
};

const hideLoader = (draft: ICarsDataState) => {
  draft.isLoading = false;
  return draft;
};

const loadCarsData = (draft: ICarsDataState, carData?: ICarsData) => {
  draft.data.push(...carData?.data || []);
  draft.count = carData?.count || 0;
  return draft;
};

export default (state = initialState, action: ICarsDataActionType) => produce(
  state,
  (draft: ICarsDataState) => {
    switch (action.type) {
      case LOAD_CARS_SUCCESS: return loadCarsData(draft, action.data);
      case SHOW_CARS_LOADER: return showLoader(draft);
      case HIDE_CARS_LOADER: return hideLoader(draft);
      default: return state;
    }
  },
);
