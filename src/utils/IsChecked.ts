import { IRadioButtonState } from '../types/state';

export const IsChecked = (type: string, index: number, formName: string, idState: IRadioButtonState) => {
  switch (formName) {
    case 'cars':
      return idState.radioCar === `${type}-${formName}-${index}`;
    case 'color':
      return idState.radioColor === `${type}-${formName}-${index}`;
    case 'tariff':
      return idState.radioTariff === `${type}-${formName}-${index}`;
    case 'advanced':
      return idState.checkboxAdvanced.includes(`${type}-${formName}-${index}`);
    default: return false;
  }
};
