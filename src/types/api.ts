export interface IPointsData {
  data: Array<IPoint>;
}

export interface IPoint {
  id: string,
  address: string,
  cityId: {
    id: string,
    name: string,
  },
  name: string,
}

export interface ICarsData {
  count: number;
  data: Array<ICarInfoData>;
}

export interface ICarInfoData {
  updatedAt: number;
  createdAt: number;
  description: string;
  priceMin: number;
  priceMax: number;
  name: string;
  number: string;
  categoryId: ICarCategory;
  thumbnail: ICarThumbnail,
  tank: number;
  colors: string[],
  id: string;
}

export interface ICarCategory {
  name: string;
  description: string;
  id: string;
}

export interface ICarThumbnail {
  path: string;
  size: number;
  originalname: string;
  mimetype: string;
}

export interface IOrderStatus {
  data: IOrderStatusResponse;
  fields: {
    'orderStatusId': {
      'name': string,
      'type': string,
      'populate': {
        'select': string[],
        'filter': ''
      },
      'ref': string,
      'required': boolean
    },
    'cityId': {
      'required': boolean,
      'ref': string,
      'populate': {
        'filter': '',
        'select': string[],
      },
      'type': string,
      'name': string,
    },
    'pointId': {
      'ref': string,
      'populate': {
        'filter': '',
        'select': string[],
      },
      'required': boolean,
      'type': string,
      'name': string,
    },
    'carId': {
      'ref': string,
      'populate': {
        'filter': '',
        'select': string[],
      },
      'required': boolean,
      'type': string,
      'name': string
    },
    'color': {
      'type': string,
      'name': string
    },
    'dateFrom': {
      'required': boolean,
      'type': string,
      'name': string,
    },
    'dateTo': {
      'required': boolean,
      'type': string,
      'name': string,
    },
    'rateId': {
      'ref': string,
      'populate': {
        'filter': '',
        'select': string[],
      },
      'type': string,
      'name': string
    },
    'price': {
      'type': string,
      'name': string,
      'required': boolean,
    },
    'isFullTank': {
      'type': string,
      'name': string
    },
    'isNeedChildChair': {
      'type': string,
      'name': string
    },
    'isRightWheel': {
      'type': string,
      'name': string
    }
  }
}

export interface IOrderStatusResponse {
  'updatedAt': number,
  'createdAt': number,
  'orderStatusId': {
    'name': string,
    'id': string,
  },
  'cityId': {
    'name': string,
    'id': string,
  },
  'pointId': {
    'name': string,
    'address': string,
    'id': string,
  },
  'carId': {
    'description': string,
    'priceMin': number,
    'priceMax': number,
    'name': string,
    'number': string,
    'categoryId': {
      'name': string,
      'description': string,
      'id': string
    },
    'thumbnail': {
      'mimetype': string,
      'originalname': string,
      'size': number,
      'path': string,
    },
    'colors': string[],
    'id': string
  },
  'color': string,
  'dateFrom': number,
  'dateTo': number,
  'rateId': {
    'price': number,
    'rateTypeId': {
      'name': string,
      'unit': string,
      'id': string,
    },
    'id': string,
  },
  'price': number,
  'isFullTank': boolean,
  'isNeedChildChair': boolean,
  'isRightWheel': boolean,
  'id': string,
}
