import produce from 'immer';
import { IOrderInfoState } from '../../types/state';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../constants/common';
import { IOrderCarInfoActionType, IOrderInfoActionType } from '../../types/actions';
import {
  BABY_CHAIR_NEEDED, CLEAR_ORDER_INFO,
  FULL_TANK_NEEDED, RESET_CAR_INFO, RIGHT_HAND_NEEDED,
  SET_CAR_COLOR,
  SET_CAR_INFO,
  SET_CITY_DATA,
  SET_MARKER_DATA,
  SET_RENTAL_DURATION_ED,
  SET_RENTAL_DURATION_SD,
  SET_TARIFF, SET_TOTAL_COST,
} from '../../constants/actions/orderInfo';

export const orderInfoInitialState: IOrderInfoState = {
  location: {
    cityName: EMPTY_STRING,
    cityId: EMPTY_STRING,
    markerName: EMPTY_STRING,
    markerId: EMPTY_STRING,
    cityCoords: [55.755819, 37.617644],
    markerCoords: EMPTY_ARRAY,
    selectionCompleted: false,
  },
  car: {
    id: EMPTY_STRING,
    name: EMPTY_STRING,
    number: EMPTY_STRING,
    tank: 0,
    image: EMPTY_STRING,
    selectedCar: EMPTY_STRING,
    maxPrice: EMPTY_STRING,
    minPrice: EMPTY_STRING,
    currentColor: 'Любой',
    colors: EMPTY_ARRAY,
    babyChair: false,
    fullTank: false,
    rentalDuration: {
      from: EMPTY_STRING,
      to: EMPTY_STRING,
    },
    rightHandDrive: false,
    tariff: 'Недельный (Акция!)',
    tariffId: '60c614202aed9a0b9b84f543',
    totalCost: 0,
  },
};

const changeCityData = (draft: IOrderInfoState, cityName?: string, cityCoords?: number[], cityId?: string) => {
  draft.location.cityName = cityName || EMPTY_STRING;
  draft.location.cityCoords = cityCoords || EMPTY_ARRAY;
  draft.location.cityId = cityId || EMPTY_STRING;
  return draft;
};

const changeMarkerData = (draft: IOrderInfoState, markerName?: string, markerCoords?: number[], markerId?: string) => {
  draft.location.markerName = markerName || EMPTY_STRING;
  draft.location.markerCoords = markerCoords || EMPTY_ARRAY;
  draft.location.markerId = markerId || EMPTY_STRING;
  return draft;
};

const carInfo = (draft: IOrderInfoState, props?: IOrderCarInfoActionType) => {
  const {
    id,
    name,
    number,
    tank,
    minPrice,
    maxPrice,
    image,
    colors,
    selectedCar,
  } = { ...props };
  draft.car.id = id || EMPTY_STRING;
  draft.car.name = name || EMPTY_STRING;
  draft.car.number = number || EMPTY_STRING;
  draft.car.tank = tank || 0;
  draft.car.minPrice = Number(minPrice) < Number(maxPrice) ? minPrice || EMPTY_STRING : maxPrice || EMPTY_STRING;
  draft.car.maxPrice = Number(minPrice) > Number(maxPrice) ? minPrice || EMPTY_STRING : maxPrice || EMPTY_STRING;
  draft.car.image = image || EMPTY_STRING;
  draft.car.colors = Array.from(new Set(colors));
  draft.car.selectedCar = selectedCar || EMPTY_STRING;
  return draft;
};

const setCarColor = (draft: IOrderInfoState, color?: string) => {
  draft.car.currentColor = color || EMPTY_STRING;
  return draft;
};

const startDayRent = (draft: IOrderInfoState, startDay?: string) => {
  draft.car.rentalDuration.from = startDay || EMPTY_STRING;
  return draft;
};

const endDayRent = (draft: IOrderInfoState, endDay?: string) => {
  draft.car.rentalDuration.to = endDay || EMPTY_STRING;
  return draft;
};

const setTariff = (draft: IOrderInfoState, tariff?: string, tariffId?: string) => {
  draft.car.tariff = tariff?.split(',')[0] || EMPTY_STRING;
  draft.car.tariffId = tariffId || EMPTY_STRING;
  return draft;
};

const setBabyChair = (draft: IOrderInfoState, babyChair?: boolean) => {
  draft.car.babyChair = babyChair || false;
  return draft;
};

const setRightHandDrive = (draft: IOrderInfoState, rightHandDrive?: boolean) => {
  draft.car.rightHandDrive = rightHandDrive || false;
  return draft;
};

const setFullTank = (draft: IOrderInfoState, fullTank?: boolean) => {
  draft.car.fullTank = fullTank || false;
  return draft;
};

const setTotalCost = (draft: IOrderInfoState, totalCost?: number) => {
  draft.car.totalCost = totalCost || 0;
  return draft;
};

const resetCarInfo = (draft: IOrderInfoState) => {
  draft.car = orderInfoInitialState.car;
  return draft;
};

const clearOrderInfo = (draft: IOrderInfoState) => {
  draft = orderInfoInitialState;
  return draft;
};

export default (state = orderInfoInitialState, action: IOrderInfoActionType) => produce(
  state,
  (draft: IOrderInfoState) => {
    switch (action.type) {
      case SET_CITY_DATA:
        return changeCityData(draft, action.location?.cityName, action.location?.cityCoords, action.location?.cityId);
      case SET_MARKER_DATA:
        return changeMarkerData(draft, action.location?.markerName, action.location?.markerCoords, action.location?.markerId);
      case SET_CAR_INFO: return carInfo(draft, action.car);
      case SET_CAR_COLOR: return setCarColor(draft, action.car?.currentColor);
      case SET_RENTAL_DURATION_SD: return startDayRent(draft, action.car?.rentalDuration?.from);
      case SET_RENTAL_DURATION_ED: return endDayRent(draft, action.car?.rentalDuration?.to);
      case SET_TARIFF: return setTariff(draft, action.car?.tariff, action.car?.tariffId);
      case FULL_TANK_NEEDED: return setFullTank(draft, action.car?.fullTank);
      case BABY_CHAIR_NEEDED: return setBabyChair(draft, action.car?.babyChair);
      case RIGHT_HAND_NEEDED: return setRightHandDrive(draft, action.car?.rightHandDrive);
      case SET_TOTAL_COST: return setTotalCost(draft, action.car?.totalCost);
      case RESET_CAR_INFO: return resetCarInfo(draft);
      case CLEAR_ORDER_INFO: return clearOrderInfo(draft);
      default: return state;
    }
  },
);
