import { useDispatch } from 'react-redux';
import { IOrderInfoState } from '../types/state';
import {
  ADVANCED_URL_PATH,
  EMPTY_STRING,
  MODELS_URL_PATH,
  ORDER_LOCATION_URL_PATH,
  RESULT_URL_PATH,
} from '../constants/common';
import {
  changeAdvTabStateAction,
  changeLocTabStateAction,
  changeModelTabStateAction,
} from '../redux/actions/OrderStepAction';

export const ButtonState = (currentLocation: string, orderInfo: IOrderInfoState) => {
  const dispatch = useDispatch();
  const { location, car } = orderInfo;

  switch (currentLocation) {
    case ORDER_LOCATION_URL_PATH: {
      if (location.cityName === EMPTY_STRING || location.markerName === EMPTY_STRING) return true;
      dispatch(changeLocTabStateAction(true));
      return false;
    }
    case MODELS_URL_PATH: {
      if (car.name === EMPTY_STRING) return true;
      dispatch(changeModelTabStateAction(true));
      return false;
    }
    case ADVANCED_URL_PATH: {
      if (
        car.currentColor === EMPTY_STRING
        || car.rentalDuration.from === EMPTY_STRING
        || car.rentalDuration.to === EMPTY_STRING
        || car.tariff === EMPTY_STRING) return true;
      dispatch(changeAdvTabStateAction(true));
      return false;
    }
    case RESULT_URL_PATH: return false;
    default: return false;
  }
};
