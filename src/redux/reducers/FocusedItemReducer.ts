import produce from 'immer';
import { IFocusedItemState } from '../../types/state';
import { EMPTY_STRING } from '../../constants/common';
import { IFocusedItemActionType } from '../../types/actions';
import { SET_FOCUSED_FIELD } from '../../constants/actions/inputField';

const initialState: IFocusedItemState = {
  item: EMPTY_STRING,
  isActive: false,
};

const setFocusedField = (draft: IFocusedItemState, fieldId?: string, isActive?: boolean) => {
  draft.item = fieldId || EMPTY_STRING;
  draft.isActive = isActive || false;
  return draft;
};

export default (state = initialState, action: IFocusedItemActionType) => produce(
  state,
  (draft: IFocusedItemState) => {
    switch (action.type) {
      case SET_FOCUSED_FIELD: return setFocusedField(draft, action.item, action.isActive);
      default: return state;
    }
  },
);
