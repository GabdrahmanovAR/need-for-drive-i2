import { Dispatch } from 'redux';
import { SUCCESSFULL_SAVE_STATE } from '../../constants/actions/successfullSave';
import { ISuccessfullSaveACtionType } from '../../types/actions';

const successfullSaveState = (isActive: boolean): ISuccessfullSaveACtionType => ({
  type: SUCCESSFULL_SAVE_STATE,
  isActive,
});

export const successfullSaveStateAction = (isActive: boolean) => (dispatch: Dispatch) => {
  dispatch(successfullSaveState(isActive));
};
