import produce from 'immer';
import { SUCCESSFULL_SAVE_STATE } from '../../constants/actions/successfullSave';
import { ISuccessfullSaveACtionType } from '../../types/actions';
import { ISuccessfullSaveState } from '../../types/state';

const initialState: ISuccessfullSaveState = {
  isActive: false,
};

const successfullSaveState = (draft: ISuccessfullSaveState, isActive?: boolean) => {
  draft.isActive = isActive || false;
  return draft;
};

export default (state = initialState, action: ISuccessfullSaveACtionType) => produce(
  state,
  (draft: ISuccessfullSaveState) => {
    switch (action.type) {
      case SUCCESSFULL_SAVE_STATE: return successfullSaveState(draft, action.isActive);
      default: return state;
    }
  },
);
