import produce from 'immer';
import {
  HIDE_ENTITY_TYPES_LOADER, LOAD_CATEGORY_SUCCESS, LOAD_RATES_SUCCESS, SHOW_ENTITY_TYPES_LOADER,
} from '../../constants/actions/entityTypes';
import { IEntityTypesActionType } from '../../types/actions';
import { ICategory, IEntityCategory } from '../../types/api';
import { IEntityTypesState, IRateInfoState, IRateState } from '../../types/state';

const initialState: IEntityTypesState = {
  category: {
    count: 0,
    data: [] as ICategory[],
  } as IEntityCategory,
  rates: {
    count: 0,
    data: [] as IRateInfoState[],
  } as IRateState,
  isLoading: false,
};

const showLoader = (draft: IEntityTypesState) => {
  draft.isLoading = true;
  return draft;
};

const hideLoader = (draft: IEntityTypesState) => {
  draft.isLoading = false;
  return draft;
};

const loadCategory = (draft: IEntityTypesState, data?: IEntityCategory) => {
  draft.category = data || {} as IEntityCategory;
  return draft;
};

const loadRates = (draft: IEntityTypesState, data?: IRateState) => {
  draft.rates = data || {} as IRateState;
  return draft;
};

export default (state = initialState, action: IEntityTypesActionType) => produce(
  state,
  (draft: IEntityTypesState) => {
    switch (action.type) {
      case LOAD_CATEGORY_SUCCESS: return loadCategory(draft, action.category);
      case LOAD_RATES_SUCCESS: return loadRates(draft, action.rates);
      case SHOW_ENTITY_TYPES_LOADER: return showLoader(draft);
      case HIDE_ENTITY_TYPES_LOADER: return hideLoader(draft);
      default: return state;
    }
  },
);
