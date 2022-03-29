import { IState } from '../types/state';

export const radioButtonSelector = (state: IState) => ({
  selectedItem: state.radioButton.selectedItem,
  radioCar: state.radioButton.radioCar,
  checkboxAdvanced: state.radioButton.checkboxAdvanced,
  radioColor: state.radioButton.radioColor,
  radioTariff: state.radioButton.radioTariff,
});
