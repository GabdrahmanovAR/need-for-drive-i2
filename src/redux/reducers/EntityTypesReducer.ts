import produce from 'immer';
import {
  HIDE_ENTITY_TYPES_LOADER, LOAD_CATEGORY_SUCCESS, SHOW_ENTITY_TYPES_LOADER,
} from '../../constants/actions/entityTypes';
import { IEntityTypesActionType } from '../../types/actions';
import { ICategory, IEntityCategory } from '../../types/api';
import { IEntityTypesState } from '../../types/state';

const initialState: IEntityTypesState = {
  category: {
    count: 0,
    data: [] as ICategory[],
  } as IEntityCategory,
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

export default (state = initialState, action: IEntityTypesActionType) => produce(
  state,
  (draft: IEntityTypesState) => {
    switch (action.type) {
      case LOAD_CATEGORY_SUCCESS: return loadCategory(draft, action.category);
      case SHOW_ENTITY_TYPES_LOADER: return showLoader(draft);
      case HIDE_ENTITY_TYPES_LOADER: return hideLoader(draft);
      default: return state;
    }
  },
);
