import { IInputFieldActionType } from '../../types/actions';
import { SET_FOCUSED_FIELD } from '../../constants/actions/inputField';

export const setFocusedFieldAction = (fieldId: string): IInputFieldActionType => ({
  type: SET_FOCUSED_FIELD,
  focusedField: fieldId,
});
