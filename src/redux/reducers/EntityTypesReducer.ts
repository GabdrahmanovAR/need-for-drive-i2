import produce from 'immer';
import {
  CATEGORY_MODAL_STATE,
  CLEAR_SELECTED_CATEGORY_DATA,
  CLEAR_SELECTED_RATE_DATA,
  HIDE_ENTITY_TYPES_LOADER,
  LOAD_CATEGORY_SUCCESS,
  LOAD_RATES_SUCCESS,
  RATE_MODAL_STATE,
  SELECTED_CATEGORY_DATA,
  SELECTED_RATE_DATA,
  SHOW_ENTITY_TYPES_LOADER,
  UPDATE_CATEGORY_DATA,
  UPDATE_RATE_DATA,
} from '../../constants/actions/entityTypes';
import { EMPTY_STRING } from '../../constants/common';
import { IEntityTypesActionType } from '../../types/actions';
import { ICategory, IEntityCategory } from '../../types/api';
import {
  IEntityCategoryState,
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

const categoryDataInitialState: ICategory = {
  updatedAt: 0,
  createdAt: 0,
  name: EMPTY_STRING,
  description: EMPTY_STRING,
  id: EMPTY_STRING,
};

const initialState: IEntityTypesState = {
  category: {
    data: {
      count: 0,
      data: [] as ICategory[],
    },
    selectedCategory: categoryDataInitialState,
    categoryModalVisible: false,
    changedDataIndex: 0,
    updatedData: {} as ICategory,
  } as IEntityCategoryState,
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

const selectedCategoryData = (draft: IEntityTypesState, category?: ICategory, index?: number) => {
  draft.category.selectedCategory = category || {} as ICategory;
  draft.category.changedDataIndex = index || 0;
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

const updateCategoryData = (draft: IEntityTypesState, category?: ICategory) => {
  if (category) draft.category.data.data[draft.category.changedDataIndex] = category;
  return draft;
};

const clearSelectedRateData = (draft: IEntityTypesState) => {
  draft.rates.selectedRate = rateDataInitialState;
  draft.rates.rateModalVisible = false;
  return draft;
};

const clearSelectedCategoryData = (draft: IEntityTypesState) => {
  draft.category.selectedCategory = categoryDataInitialState;
  draft.category.categoryModalVisible = false;
  return draft;
};

const rateModalWindowState = (draft: IEntityTypesState, isVisible?: boolean) => {
  draft.rates.rateModalVisible = isVisible || false;
  return draft;
};

const categoryModalWindowState = (draft: IEntityTypesState, isVisible?: boolean) => {
  draft.category.categoryModalVisible = isVisible || false;
  return draft;
};

const loadCategory = (draft: IEntityTypesState, data?: IEntityCategory) => {
  draft.category.data = data || {} as IEntityCategory;
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
      case LOAD_CATEGORY_SUCCESS: return loadCategory(draft, action.category?.data);
      case LOAD_RATES_SUCCESS: return loadRates(draft, action.rates?.data);
      case SELECTED_RATE_DATA:
        return selectedRateData(draft, action.rates?.selectedRate, action.rates?.changedDataIndex);
      case SELECTED_CATEGORY_DATA:
        return selectedCategoryData(draft, action.category?.selectedCategory, action.category?.changedDataIndex);
      case UPDATE_RATE_DATA: return updateRateData(draft, action.rates?.updatedData, action.rates?.changedDataIndex);
      case UPDATE_CATEGORY_DATA: return updateCategoryData(draft, action.category?.updatedData);
      case RATE_MODAL_STATE: return rateModalWindowState(draft, action.rates?.rateModalVisible);
      case CATEGORY_MODAL_STATE: return categoryModalWindowState(draft, action.category?.categoryModalVisible);
      case CLEAR_SELECTED_RATE_DATA: return clearSelectedRateData(draft);
      case CLEAR_SELECTED_CATEGORY_DATA: return clearSelectedCategoryData(draft);
      case SHOW_ENTITY_TYPES_LOADER: return showLoader(draft);
      case HIDE_ENTITY_TYPES_LOADER: return hideLoader(draft);
      default: return state;
    }
  },
);
