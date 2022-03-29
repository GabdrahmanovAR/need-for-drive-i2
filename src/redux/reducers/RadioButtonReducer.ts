import produce from 'immer';
import { IRadioButtonState } from '../../types/state';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../constants/common';
import { IRadioButtonActionType } from '../../types/actions';
import {
  SELECT_ITEM,
  RADIO_BTN_CAR_ID,
  RADIO_BTN_COLOR_ID,
  RADIO_BTN_TARIFF_ID, RADIO_BTN_ADVANCED_ID, RESET_RADIO_BTN,
} from '../../constants/actions/radioButton';

const radioBtnInitialState: IRadioButtonState = {
  selectedItem: 'all',
  radioCar: 'radio-cars-0',
  checkboxAdvanced: EMPTY_ARRAY,
  radioColor: 'radio-color-0',
  radioTariff: 'radio-tariff-0',
};

const selectItem = (draft: IRadioButtonState, item?: string) => {
  draft.selectedItem = item || EMPTY_STRING;
  return draft;
};

const radioBtnCarId = (draft: IRadioButtonState, id?: string) => {
  draft.radioCar = id || EMPTY_STRING;
  return draft;
};

const radioBtnColorId = (draft: IRadioButtonState, id?: string) => {
  draft.radioColor = id || EMPTY_STRING;
  return draft;
};

const radioBtnTariffId = (draft: IRadioButtonState, id?: string) => {
  draft.radioTariff = id || EMPTY_STRING;
  return draft;
};

const radioBtnAdvId = (draft: IRadioButtonState, id?: string[]) => {
  if (id) {
    if (draft.checkboxAdvanced.length === 0) {
      draft.checkboxAdvanced = [...id];
    } else if (draft.checkboxAdvanced.indexOf(id[0]) === -1) {
      draft.checkboxAdvanced = [...draft.checkboxAdvanced, ...id];
    } else {
      const index = draft.checkboxAdvanced.indexOf(id[0]);
      draft.checkboxAdvanced.splice(index, 1);
    }
  }
  return draft;
};

const resetRadioBtnState = (draft: IRadioButtonState) => {
  draft = radioBtnInitialState;
  return draft;
};

export default (state = radioBtnInitialState, action: IRadioButtonActionType) => produce(
  state,
  (draft: IRadioButtonState) => {
    switch (action.type) {
      case SELECT_ITEM: return selectItem(draft, action.selectedItem);
      case RADIO_BTN_CAR_ID: return radioBtnCarId(draft, action.radioCar);
      case RADIO_BTN_COLOR_ID: return radioBtnColorId(draft, action.radioColor);
      case RADIO_BTN_TARIFF_ID: return radioBtnTariffId(draft, action.radioTariff);
      case RADIO_BTN_ADVANCED_ID: return radioBtnAdvId(draft, action.checkboxAdvanced);
      case RESET_RADIO_BTN: return resetRadioBtnState(draft);
      default: return state;
    }
  },
);
