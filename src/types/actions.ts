import {
  ICarInfoData, ICarsData, ICities, IEntityCategory, IPoint,
} from './api';
import {
  IOrderStatusInfoState, IPointCityCoordsState, IPointMarkerCoordsState, IRateInfoState, IRateState,
} from './state';

export interface IActionType {
  type: string;
}

export interface ISidebarMenuActionType extends IActionType {
  menuOpen?: boolean;
}

export interface IAdminSidebarMenuActionType extends IActionType {
  menuOpen?: boolean;
  selectedMenu?: string;
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

export interface IAdvancedTabActionType extends IActionType {
  startDay?: string;
  endDay?: string;
}

export interface IFocusedItemActionType extends IActionType{
  item?: string;
  isActive?: boolean;
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
  cities?: ICities;
}

export interface ICarsDataActionType extends IActionType {
  data?: ICarsData;
  dataAdminPart?: ICarsData;
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
  count?: number
  loading?: boolean;
  statusInfo?: IOrderStatusInfoState;
}

export interface ISuccessfullSaveACtionType extends IActionType {
  isActive?: boolean;
}

export interface IAdminCarCardActionType extends IActionType {
  cardState?: string;
  data?: ICarInfoData;
}

export interface IEntityTypesActionType extends IActionType {
  category?: IEntityCategory;
  rates?: IRateState;
  selectedRate?: IRateInfoState;
  rateModalVisible?: boolean;
  isLoading?: boolean;
}
