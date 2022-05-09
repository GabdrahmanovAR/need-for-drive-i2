import produce from 'immer';
import { SUCCESSFULL_SAVE_STATE } from '../../constants/actions/successfullSave';
import { EMPTY_STRING } from '../../constants/common';
import { ISuccessfullSaveACtionType } from '../../types/actions';
import { ISuccessfullSaveState } from '../../types/state';

const initialState: ISuccessfullSaveState = {
  message: EMPTY_STRING,
  isActive: false,
};

const successfullSaveState = (draft: ISuccessfullSaveState, message?: string, isActive?: boolean) => {
  draft.message = message || EMPTY_STRING;
  draft.isActive = isActive || false;
  return draft;
};

export default (state = initialState, action: ISuccessfullSaveACtionType) => produce(
  state,
  (draft: ISuccessfullSaveState) => {
    switch (action.type) {
      case SUCCESSFULL_SAVE_STATE: return successfullSaveState(draft, action.message, action.isActive);
      default: return state;
    }
  },
);
