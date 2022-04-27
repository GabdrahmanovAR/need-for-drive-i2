import { IState } from '../types/state';

export const successfullSaveSelector = (state: IState) => ({
  isActive: state.successfullSave.isActive,
});
