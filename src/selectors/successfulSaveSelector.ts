import { IState } from '../types/state';

export const successfullSaveSelector = (state: IState) => ({
  message: state.successfullSave.message,
  isActive: state.successfullSave.isActive,
});
