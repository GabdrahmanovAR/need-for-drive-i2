import { IFocusedItemActionType } from '../../types/actions';
import { SET_FOCUSED_FIELD } from '../../constants/actions/inputField';

export const setFocusedFieldAction = (item: string): IFocusedItemActionType => ({
  type: SET_FOCUSED_FIELD,
  item,
});
