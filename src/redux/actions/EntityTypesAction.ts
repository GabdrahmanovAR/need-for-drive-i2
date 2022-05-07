import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import {
  changeCategory,
  changeRatePrice, changeRateType, deleteCategory, deleteRate, deleteRateType, getCategory, getRate,
} from '../../api-request/apiRequest';
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
import { CATEGORY_SAVED, RATE_DELETED, RATE_SAVED } from '../../constants/common';
import { IEntityTypesActionType } from '../../types/actions';
import { ICategory, IEntityCategory } from '../../types/api';
import {
  IChangedCategoryState,
  IChangedRateInfoState, IChangedRateTypeInfoState, IRateInfoState, IRateState,
} from '../../types/state';
import { successfullSaveState } from './SuccessfullSaveAction';

const showLoader = (): IEntityTypesActionType => ({
  type: SHOW_ENTITY_TYPES_LOADER,
});

const hideLoader = (): IEntityTypesActionType => ({
  type: HIDE_ENTITY_TYPES_LOADER,
});

const rateModalState = (isVisible: boolean): IEntityTypesActionType => ({
  type: RATE_MODAL_STATE,
  rates: {
    rateModalVisible: isVisible,
  },
});

const selectedRateData = (rate: IRateInfoState, index: number): IEntityTypesActionType => ({
  type: SELECTED_RATE_DATA,
  rates: {
    selectedRate: rate,
    changedDataIndex: index,
  },
});

const selectedRateDataClear = (): IEntityTypesActionType => ({
  type: CLEAR_SELECTED_RATE_DATA,
});

const loadCategory = (data: IEntityCategory): IEntityTypesActionType => ({
  type: LOAD_CATEGORY_SUCCESS,
  category: {
    data,
  },
});

const loadRates = (data: IRateState): IEntityTypesActionType => ({
  type: LOAD_RATES_SUCCESS,
  rates: {
    data,
  },
});

const updateRates = (updatedData: any, index: number): IEntityTypesActionType => ({
  type: UPDATE_RATE_DATA,
  rates: {
    updatedData,
    changedDataIndex: index,
  },
});

const updateCategory = (updatedData: ICategory): IEntityTypesActionType => ({
  type: UPDATE_CATEGORY_DATA,
  category: {
    updatedData,
  },
});

export const rateModalWindowStateAction = (isVisible: boolean) => (dispatch: Dispatch) => {
  dispatch(rateModalState(isVisible));
};

export const categoryModalWindowStateAction = (isVisible: boolean): IEntityTypesActionType => ({
  type: CATEGORY_MODAL_STATE,
  category: {
    categoryModalVisible: isVisible,
  },
});

export const selectedRateDataAction = (rate: IRateInfoState, index: number) => (dispatch: Dispatch) => {
  dispatch(selectedRateData(rate, index));
};

export const selectedCategoryDataAction = (category: ICategory, index: number): IEntityTypesActionType => ({
  type: SELECTED_CATEGORY_DATA,
  category: {
    selectedCategory: category,
    changedDataIndex: index,
  },
});

export const selectedRateDataCLearAction = () => (dispatch: Dispatch) => {
  dispatch(selectedRateDataClear());
};

export const selectedCategoryDataCLearAction = (): IEntityTypesActionType => ({
  type: CLEAR_SELECTED_CATEGORY_DATA,
});

export const loadCategoryAction = () => async (dispatch: Dispatch) => {
  dispatch(showLoader());
  try {
    const response: AxiosResponse<IEntityCategory> = await getCategory();
    dispatch(loadCategory(response.data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideLoader());
  }
};

export const loadRatesAction = () => async (dispatch: Dispatch) => {
  dispatch(showLoader());
  try {
    const response: AxiosResponse<IRateState> = await getRate();
    dispatch(loadRates(response.data));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(hideLoader());
  }
};

export const changeRatePriceAction = (rateId: string, rateTypeId: string, price: number, index: number) => async (dispatch: Dispatch) => {
  try {
    const response: AxiosResponse<IChangedRateInfoState> = await changeRatePrice(rateId, rateTypeId, price);
    dispatch(updateRates(response.data.data, index));
    if (response.status === 200) dispatch(successfullSaveState(RATE_SAVED, true));
  } catch (error) {
    console.log(error);
  }
};

export const changeRateTypeAction = (rateTypeId: string, name: string, unit: string, index: number) => async (dispatch: Dispatch) => {
  try {
    const response: AxiosResponse<IChangedRateTypeInfoState> = await changeRateType(rateTypeId, name, unit);
    if (response.status === 200) {
      dispatch(updateRates(response.data.data, index));
      dispatch(successfullSaveState(RATE_SAVED, true));
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteRateAction = (rateId: string, rateTypeId: string) => async (dispatch: Dispatch) => {
  try {
    const responseRate = await deleteRate(rateId);
    const responseRateType = await deleteRateType(rateTypeId);
    if (responseRate.status === 200 && responseRateType.status === 200) {
      dispatch(successfullSaveState(RATE_DELETED, true));
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeCategoryAction = (categoryId: string, name: string, description: string) => async (dispatch: Dispatch) => {
  try {
    const response: AxiosResponse<IChangedCategoryState> = await changeCategory(categoryId, name, description);
    if (response.status === 200) {
      dispatch(updateCategory(response.data.data));
      dispatch(successfullSaveState(CATEGORY_SAVED, true));
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryAction = (categoryId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await deleteCategory(categoryId);
    if (response.status === 200) dispatch(successfullSaveState(RATE_DELETED, true));
  } catch (error) {
    console.log(error);
  }
};
