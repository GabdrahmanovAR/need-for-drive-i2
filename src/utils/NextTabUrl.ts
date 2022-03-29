import {
  ADVANCED_URL_PATH, CONFIRM_TAB,
  EMPTY_STRING,
  MODELS_URL_PATH,
  ORDER_LOCATION_URL_PATH,
  RESULT_URL_PATH,
} from '../constants/common';

export const NextTabUrl = (currentLocation: string):string => {
  switch (currentLocation) {
    case ORDER_LOCATION_URL_PATH: return MODELS_URL_PATH;
    case MODELS_URL_PATH: return ADVANCED_URL_PATH;
    case ADVANCED_URL_PATH: return RESULT_URL_PATH;
    case RESULT_URL_PATH: return CONFIRM_TAB;
    default: return EMPTY_STRING;
  }
};
