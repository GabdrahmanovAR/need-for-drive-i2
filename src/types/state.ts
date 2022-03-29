import { ICarsFakeData } from '../constants/fake-data/cars';
import { ICarInfoData, IPoint } from './api';

export interface IState {
  sidebarMenu: ISidebarMenuState;
  carCard: ICarCardState;
  advancedTab: IAdvancedTabState;
  inputField: IInputFieldState;
  orderConfirm: IOrderConfirmState;
  orderInfo: IOrderInfoState;
  orderStep: IOrderStepState;
  pointsData: IPointsDataState;
  carsData: ICarsDataState;
  radioButton: IRadioButtonState;
  rate: IRateState;
  orderStatus: IOrderStatusState;
}

export interface ISidebarMenuState {
  isOpen: boolean;
}

export interface ICarCardState {
  activeCard: string;
  selectedCarInfo: ICarsFakeData;
}

export interface IAdvancedTabState {
  startDay: string;
  endDay: string;
}

export interface IInputFieldState {
  focusedField: string;
}

export interface IOrderConfirmState {
  isActive: boolean;
}

export interface IOrderInfoState {
  location: IOrderLocationState;
  car: IOrderCarInfoState;
}

export interface IOrderLocationState {
  cityName: string;
  cityId: string;
  markerName: string;
  markerId: string;
  cityCoords: Array<number>;
  markerCoords: Array<number>;
  selectionCompleted: boolean;
}

export interface IOrderCarInfoState {
  id: string;
  name: string;
  number: string;
  tank: number;
  minPrice: string,
  maxPrice: string,
  image: string,
  currentColor: string;
  colors: string[];
  rentalDuration: {
    from: string,
    to: string,
  }
  tariff: string;
  tariffId: string;
  fullTank: boolean;
  babyChair: boolean;
  rightHandDrive: boolean;
  selectedCar: string,
  totalCost: number,
}

export interface IOrderStepState {
  locationTabCompleted: boolean;
  modelTabCompleted: boolean;
  advancedTabCompleted: boolean;
  activeTab: string;
}

export interface IPointsDataState {
  data: Array<IPoint>;
  cityCoords: Array<IPointCityCoordsState>;
  markerCoords: Array<IPointMarkerCoordsState>;
  isLoading: boolean;
}

export interface IPointCityCoordsState {
  id: string;
  coordinates: number[];
}

export interface IPointMarkerCoordsState {
  id: string;
  coordinates: number[];
}

export interface ICarsDataState {
  count: number;
  data: Array<ICarInfoData>;
  isLoading: boolean;
}

export interface IRadioButtonState {
  selectedItem: string;
  radioCar: string;
  radioColor: string;
  radioTariff: string;
  checkboxAdvanced: string[];
}

export interface IRateState {
  count: number;
  data: IRateInfoState[],
}

export interface IRateInfoState {
  updatedAt: number;
  createdAt: number;
  price: number;
  rateTypeId: IRateTypeInfoState;
  id: string;
}

interface IRateTypeInfoState {
  unit: string;
  name: string;
  id: string;
}

export interface IOrderStatusState {
  loading: boolean;
  statusInfo: IOrderStatusInfoState;
}

export interface IOrderStatusInfoState {
  car: {
    name: string;
    number: string;
    image: string;
  };
  cityName: string;
  color: string;
  dateFrom: number;
  dateTo: number;
  id: string;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
  pointName: string;
  price: number;
  rate: string;
}
