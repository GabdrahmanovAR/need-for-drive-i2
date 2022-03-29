import { ICarsFakeData } from '../constants/fake-data/cars';
import { ICarsData, IPoint } from './api';
import {
  IOrderStatusInfoState, IPointCityCoordsState, IPointMarkerCoordsState, IRateInfoState,
} from './state';

export interface IActionType {
  type: string;
}

export interface ISidebarMenuActionType extends IActionType {
  menuOpen?: boolean;
}

export interface IOrderLocationActionType {
  cityName?: string;
  cityId?: string;
  markerName?: string;
  markerId?: string;
  cityCoords?: Array<number>;
  markerCoords?: Array<number>;
  selectionCompleted?: boolean;
}

export interface ICarCardActionType extends IActionType {
  activeCard?: string;
  selectedCarInfo?: ICarsFakeData;
}

export interface IAdvancedTabActionType extends IActionType {
  startDay?: string;
  endDay?: string;
}

export interface IInputFieldActionType extends IActionType{
  focusedField?: string;
}

export interface IOrderConfirmActionType extends IActionType {
  isActive?: boolean;
}

export interface IOrderInfoActionType extends IActionType {
  location?: IOrderLocationActionType;
  car?: IOrderCarInfoActionType;
}

export interface IOrderCarInfoActionType {
  id?: string;
  name?: string;
  number?: string;
  tank?: number;
  minPrice?: string,
  maxPrice?: string,
  image?: string,
  currentColor?: string;
  colors?: string[];
  rentalDuration?: {
    from?: string,
    to?: string,
  }
  tariff?: string;
  tariffId?: string;
  fullTank?: boolean;
  babyChair?: boolean;
  rightHandDrive?: boolean;
  selectedCar?: string,
  totalCost?: number,
}

export interface IOrderStepActionType extends IActionType {
  locationTabCompleted?: boolean;
  modelTabCompleted?: boolean;
  advancedTabCompleted?: boolean;
  activeTab?: string;
}

export interface IPointsDataActionType extends IActionType {
  data?: Array<IPoint>;
  cityCoords?: Array<IPointCityCoordsState>;
  markerCoords?: Array<IPointMarkerCoordsState>;
  isLoading?: boolean;
}

export interface ICarsDataActionType extends IActionType {
  data?: ICarsData;
}

export interface IRadioButtonActionType extends IActionType {
  selectedItem?: string;
  radioCar?: string,
  radioColor?: string,
  radioTariff?: string,
  checkboxAdvanced?: string[],
}

export interface IRateActionType extends IActionType {
  count?: number;
  data?: IRateInfoState[],
}

export interface IOrderStatusActionType extends IActionType {
  loading?: boolean;
  statusInfo?: IOrderStatusInfoState;
}
