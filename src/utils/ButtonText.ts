import { EMPTY_STRING } from '../constants/common';
import {
  ADVANCED_URL_PATH, MODELS_URL_PATH, ORDER_LOCATION_URL_PATH, ORDER_STATUS_URL_PATH, RESULT_URL_PATH,
} from '../constants/routes';

export const ButtonText = (currentLocation: string, id: string): string => {
  switch (currentLocation) {
    case ORDER_LOCATION_URL_PATH: return 'Выбрать модель';
    case MODELS_URL_PATH: return 'Дополнительно';
    case ADVANCED_URL_PATH: return 'Итого';
    case RESULT_URL_PATH: return 'Заказать';
    case `${ORDER_STATUS_URL_PATH}/${id}`: return 'Отменить';
    default: return EMPTY_STRING;
  }
};
