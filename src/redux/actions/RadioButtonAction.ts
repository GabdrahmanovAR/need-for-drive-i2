import { IRadioButtonActionType } from '../../types/actions';
import {
  SELECT_ITEM,
  RADIO_BTN_CAR_ID,
  RADIO_BTN_COLOR_ID,
  RADIO_BTN_TARIFF_ID, RADIO_BTN_ADVANCED_ID, RESET_RADIO_BTN,
} from '../../constants/actions/radioButton';

export const changeSelectedItem = (item: string): IRadioButtonActionType => ({
  type: SELECT_ITEM,
  selectedItem: item,
});

export const radioBtnCarIdAction = (fieldId: string): IRadioButtonActionType => ({
  type: RADIO_BTN_CAR_ID,
  radioCar: fieldId,
});

export const radioBtnColorIdAction = (fieldId: string): IRadioButtonActionType => ({
  type: RADIO_BTN_COLOR_ID,
  radioColor: fieldId,
});

export const radioBtnTariffIdAction = (fieldId: string): IRadioButtonActionType => ({
  type: RADIO_BTN_TARIFF_ID,
  radioTariff: fieldId,
});

export const radioBtnAdvIdAction = (fieldId: string): IRadioButtonActionType => ({
  type: RADIO_BTN_ADVANCED_ID,
  checkboxAdvanced: [fieldId],
});

export const resetRadioBtnAction = (): IRadioButtonActionType => ({
  type: RESET_RADIO_BTN,
});
