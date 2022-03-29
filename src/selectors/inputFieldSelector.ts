import { IState } from '../types/state';

export const inputFieldSelector = (state: IState) => ({
  focusedField: state.inputField.focusedField,
});
