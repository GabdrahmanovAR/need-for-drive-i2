import {
  ICarInfoData, ICategory, ICities, ICityInfo, IEntityCategory, IPoint, IPointsData,
} from './api';

export interface IState {
  sidebarMenu: ISidebarMenuState;
  adminSidebarMenu: IAdminSidebarMenuState;
  advancedTab: IAdvancedTabState;
  focusedItem: IFocusedItemState;
  orderConfirm: IOrderConfirmState;
  orderInfo: IOrderInfoState;
  orderStep: IOrderStepState;
  pointsData: IPointsDataState;
  carsData: ICarsDataState;
  radioButton: IRadioButtonState;
  rate: IRateState;
  orderStatus: IOrderStatusState;
  successfullSave: ISuccessfullSaveState;
  adminCarCard: IAdminCarCardState;
  entityTypes: IEntityTypesState;
}

export interface ISidebarMenuState {
  isOpen: boolean;
}

export interface IAdminSidebarMenuState {
  isOpen: boolean;
  selectedMenu: string;
}

export interface IAdvancedTabState {
  startDay: string;
  endDay: string;
}

export interface IFocusedItemState {
  item: string;
  isActive: boolean
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
  points: {
    data: IPointsData;
    selectedPoint: IPoint;
    changedIndexData: number;
    pointModalVisible: boolean;
    updatedData: IPoint;
  }
  cityCoords: Array<IPointCityCoordsState>;
  markerCoords: Array<IPointMarkerCoordsState>;
  isLoading: boolean;
  cities: {
    data: ICities;
    selectedCity: ICityInfo;
    changedIndexData: number;
    cityModalVisible: boolean;
    updatedData: ICityInfo;
  };
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
  dataAdminPart: Array<ICarInfoData>;
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

export interface IChangedRateInfoState {
  data: {
    updatedAt: number;
    createdAt: number;
    price: number;
    rateTypeId: IRateTypeInfoState;
    id: string;
  };
}

export interface IRateTypeInfoState {
  unit: string;
  name: string;
  id: string;
}

export interface IChangedRateTypeInfoState {
  data: {
    unit: string;
    name: string;
    id: string;
  };
}

export interface IChangedCategoryState {
  data: {
    updatedAt: number;
    createdAt: number;
    name: string;
    description: string;
    id: string;
  }
}

export interface IOrderStatusState {
  count: number;
  loading: boolean;
  statusInfo: IOrderStatusInfoState;
}

export interface IChangedOrderStatusState {
  data: IStatusInfoState;
}

export interface IOrderStatusInfoState {
  car: {
    name: string;
    number: string;
    image: string;
    tank: number;
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
  orderStatusId: {
    id: string;
    name: string;
  }
}

export interface ISuccessfullSaveState {
  message: string;
  isActive: boolean;
}

export interface IAdminCarCardState {
  cardState: string;
  data: ICarInfoData;
}

export interface IEntityTypesState {
  category: IEntityCategoryState;
  rates: IEntityRateState;
  statusList: IEntityStatusState;
  isLoading: boolean;
}

export interface IEntityRateState {
  data: IRateState;
  updatedData: IRateInfoState;
  selectedRate: IRateInfoState;
  rateModalVisible: boolean;
  changedDataIndex: number;
}

export interface IEntityCategoryState {
  data: IEntityCategory;
  updatedData: ICategory;
  selectedCategory: ICategory;
  categoryModalVisible: boolean;
  changedDataIndex: number;
}

export interface IEntityStatusState {
  data: IStatusListState;
  updatedData: IStatusInfoState;
  selectedStatus: IStatusInfoState;
  statusModalVisible: boolean;
  changedDataIndex: number;
}

export interface IStatusListState {
  count: number;
  data: IStatusInfoState[];
}

export interface IStatusInfoState {
  id: string;
  name: string;
}
