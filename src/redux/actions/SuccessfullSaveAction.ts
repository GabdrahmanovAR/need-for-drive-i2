import { Dispatch } from 'redux';
import { SUCCESSFULL_SAVE_STATE } from '../../constants/actions/successfullSave';
import { ISuccessfullSaveACtionType } from '../../types/actions';

export const successfullSaveState = (message: string, isActive: boolean): ISuccessfullSaveACtionType => ({
  type: SUCCESSFULL_SAVE_STATE,
  message,
  isActive,
});

export const successfullSaveStateAction = (message: string, isActive: boolean) => (dispatch: Dispatch) => {
  dispatch(successfullSaveState(message, isActive));
};
