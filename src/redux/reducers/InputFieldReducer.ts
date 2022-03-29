import produce from 'immer';
import { IInputFieldState } from '../../types/state';
import { EMPTY_STRING } from '../../constants/common';
import { IInputFieldActionType } from '../../types/actions';
import { SET_FOCUSED_FIELD } from '../../constants/actions/inputField';

const initialState: IInputFieldState = {
  focusedField: EMPTY_STRING,
};

const setFocusedField = (draft: IInputFieldState, fieldId?: string) => {
  draft.focusedField = fieldId || EMPTY_STRING;
  return draft;
};

export default (state = initialState, action: IInputFieldActionType) => produce(
  state,
  (draft: IInputFieldState) => {
    switch (action.type) {
      case SET_FOCUSED_FIELD: return setFocusedField(draft, action.focusedField);
      default: return state;
    }
  },
);
