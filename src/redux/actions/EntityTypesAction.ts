import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { changeRatePrice, getCategory, getRate } from '../../api-request/apiRequest';
import {
  CLEAR_SELECTED_RATE_DATA,
  HIDE_ENTITY_TYPES_LOADER, LOAD_CATEGORY_SUCCESS, LOAD_RATES_SUCCESS, RATE_MODAL_STATE, SELECTED_RATE_DATA, SHOW_ENTITY_TYPES_LOADER,
} from '../../constants/actions/entityTypes';
import { IEntityTypesActionType } from '../../types/actions';
import { IEntityCategory } from '../../types/api';
import { IRateInfoState, IRateState } from '../../types/state';

const showLoader = (): IEntityTypesActionType => ({
  type: SHOW_ENTITY_TYPES_LOADER,
});

const hideLoader = (): IEntityTypesActionType => ({
  type: HIDE_ENTITY_TYPES_LOADER,
});

const rateModalState = (isVisible: boolean): IEntityTypesActionType => ({
  type: RATE_MODAL_STATE,
  rateModalVisible: isVisible,
});

const selectedRateData = (rate: IRateInfoState): IEntityTypesActionType => ({
  type: SELECTED_RATE_DATA,
  selectedRate: rate,
});

const selectedRateDataClear = (): IEntityTypesActionType => ({
  type: CLEAR_SELECTED_RATE_DATA,
});

const loadCategory = (data: IEntityCategory): IEntityTypesActionType => ({
  type: LOAD_CATEGORY_SUCCESS,
  category: data,
});

const loadRates = (data: IRateState): IEntityTypesActionType => ({
  type: LOAD_RATES_SUCCESS,
  rates: data,
});

export const rateModalWindowStateAction = (isVisible: boolean) => (dispatch: Dispatch) => {
  dispatch(rateModalState(isVisible));
};

export const selectedRateDataAction = (rate: IRateInfoState) => (dispatch: Dispatch) => {
  dispatch(selectedRateData(rate));
};

export const selectedRateDataCLearAction = () => (dispatch: Dispatch) => {
  dispatch(selectedRateDataClear());
};

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

export const changeRatePriceAction = (rateId: string, rateTypeId: string, price: number) => async () => {
  try {
    await changeRatePrice(rateId, rateTypeId, price);
  } catch (error) {
    console.log(error);
  } finally {
    loadRatesAction();
  }
};
