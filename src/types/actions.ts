import {
  ICarInfoData, ICarsData, ICategory, ICities, ICityInfo, IEntityCategory, IPoint, IPointsData,
} from './api';
import {
  IOrderStatusInfoState, IPointCityCoordsState, IPointMarkerCoordsState, IRateInfoState, IRateState, IStatusInfoState, IStatusListState,
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
  points?: {
    data?: IPointsData;
    selectedPoint?: IPoint;
    changedIndexData?: number;
    pointModalVisible?: boolean;
    updatedData?: IPoint;
  };
  cityCoords?: Array<IPointCityCoordsState>;
  markerCoords?: Array<IPointMarkerCoordsState>;
  isLoading?: boolean;
  cities?: {
    data?: ICities;
    selectedCity?: ICityInfo;
    changedIndexData?: number;
    cityModalVisible?: boolean;
    updatedData?: ICityInfo;
  }
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
  message?: string;
  isActive?: boolean;
}

export interface IAdminCarCardActionType extends IActionType {
  cardState?: string;
  data?: ICarInfoData;
}

export interface IEntityTypesActionType extends IActionType {
  category?: IEntityCategoryActionType;
  rates?: IEntityRateStateActionType;
  statusList?: IEntityStatusActionType;
  isLoading?: boolean;
}

export interface IEntityRateStateActionType {
  data?: IRateState;
  updatedData?: IRateInfoState;
  selectedRate?: IRateInfoState;
  rateModalVisible?: boolean;
  changedDataIndex?: number;
}

export interface IEntityCategoryActionType {
  data?: IEntityCategory;
  updatedData?: ICategory;
  selectedCategory?: ICategory;
  categoryModalVisible?: boolean;
  changedDataIndex?: number;
}

export interface IEntityStatusActionType {
  data?: IStatusListState;
  updatedData?: IStatusInfoState;
  selectedStatus?: IStatusInfoState;
  statusModalVisible?: boolean;
  changedDataIndex?: number;
}
