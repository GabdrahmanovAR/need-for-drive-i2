import produce from 'immer';
import {
  CLEAR_SELECTED_RATE_DATA,
  HIDE_ENTITY_TYPES_LOADER,
  LOAD_CATEGORY_SUCCESS,
  LOAD_RATES_SUCCESS,
  RATE_MODAL_STATE,
  SELECTED_RATE_DATA,
  SHOW_ENTITY_TYPES_LOADER,
  UPDATE_RATE_DATA,
} from '../../constants/actions/entityTypes';
import { EMPTY_STRING } from '../../constants/common';
import { IEntityTypesActionType } from '../../types/actions';
import { ICategory, IEntityCategory } from '../../types/api';
import {
  IEntityRateState, IEntityTypesState, IRateInfoState, IRateState,
} from '../../types/state';

const rateDataInitialState: IRateInfoState = {
  createdAt: 0,
  id: EMPTY_STRING,
  price: 0,
  rateTypeId: {
    id: EMPTY_STRING,
    name: EMPTY_STRING,
    unit: EMPTY_STRING,
  },
  updatedAt: 0,
};

const initialState: IEntityTypesState = {
  category: {
    count: 0,
    data: [] as ICategory[],
  } as IEntityCategory,
  rates: {
    data: {
      count: 0,
      data: [] as IRateInfoState[],
    },
    selectedRate: rateDataInitialState,
    rateModalVisible: false,
    changedDataIndex: 0,
    updatedData: {} as IRateInfoState,
  } as IEntityRateState,
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

const selectedRateData = (draft: IEntityTypesState, rate?: IRateInfoState, index?: number) => {
  draft.rates.selectedRate = rate || {} as IRateInfoState;
  draft.rates.changedDataIndex = index || 0;
  return draft;
};

const updateRateData = (draft: IEntityTypesState, rate?: any, index?: number) => {
  if (rate?.price && index) draft.rates.data.data[index] = rate;
  if (rate?.unit && index) {
    let i = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of draft.rates.data.data) {
      if (i === index) {
        item.rateTypeId = rate;
      }
      i += 1;
    }
  }
  return draft;
};

const selectedRateDataClear = (draft: IEntityTypesState) => {
  draft.rates.selectedRate = rateDataInitialState;
  draft.rates.rateModalVisible = false;
  return draft;
};

const rateModalWindowState = (draft: IEntityTypesState, isVisible?: boolean) => {
  draft.rates.rateModalVisible = isVisible || false;
  return draft;
};

const loadCategory = (draft: IEntityTypesState, data?: IEntityCategory) => {
  draft.category = data || {} as IEntityCategory;
  return draft;
};

const loadRates = (draft: IEntityTypesState, data?: IRateState) => {
  draft.rates.data = data || {} as IRateState;
  return draft;
};

export default (state = initialState, action: IEntityTypesActionType) => produce(
  state,
  (draft: IEntityTypesState) => {
    switch (action.type) {
      case LOAD_CATEGORY_SUCCESS: return loadCategory(draft, action.category);
      case LOAD_RATES_SUCCESS: return loadRates(draft, action.rates?.data);
      case SELECTED_RATE_DATA: return selectedRateData(draft, action.rates?.selectedRate, action.rates?.changedDataIndex);
      case UPDATE_RATE_DATA: return updateRateData(draft, action.rates?.updatedData, action.rates?.changedDataIndex);
      case RATE_MODAL_STATE: return rateModalWindowState(draft, action.rates?.rateModalVisible);
      case CLEAR_SELECTED_RATE_DATA: return selectedRateDataClear(draft);
      case SHOW_ENTITY_TYPES_LOADER: return showLoader(draft);
      case HIDE_ENTITY_TYPES_LOADER: return hideLoader(draft);
      default: return state;
    }
  },
);
