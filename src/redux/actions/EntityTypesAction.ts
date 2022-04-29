import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { getCategory } from '../../api-request/apiRequest';
import {
  HIDE_ENTITY_TYPES_LOADER, LOAD_CATEGORY_SUCCESS, SHOW_ENTITY_TYPES_LOADER,
} from '../../constants/actions/entityTypes';
import { IEntityTypesActionType } from '../../types/actions';
import { IEntityCategory } from '../../types/api';

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
