import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { getCategory, getRate } from '../../api-request/apiRequest';
import {
  HIDE_ENTITY_TYPES_LOADER, LOAD_CATEGORY_SUCCESS, LOAD_RATES_SUCCESS, SHOW_ENTITY_TYPES_LOADER,
} from '../../constants/actions/entityTypes';
import { IEntityTypesActionType } from '../../types/actions';
import { IEntityCategory } from '../../types/api';
import { IRateState } from '../../types/state';

const showLoader = (): IEntityTypesActionType => ({
  type: SHOW_ENTITY_TYPES_LOADER,
});

const hideLoader = (): IEntityTypesActionType => ({
  type: HIDE_ENTITY_TYPES_LOADER,
});

const loadCategory = (data: IEntityCategory): IEntityTypesActionType => ({
  type: LOAD_CATEGORY_SUCCESS,
  category: data,
});

const loadRates = (data: IRateState): IEntityTypesActionType => ({
  type: LOAD_RATES_SUCCESS,
  rates: data,
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
