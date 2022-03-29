export interface ICity {
  name: string,
  coordinates : number[],
  markers: Array<ICityMarker>,
}

export interface ICityMarker {
  street: string,
  coordinates: number[],
}

export const listOfCities = [
  {
    name: 'Москва',
    coordinates: [55.753220, 37.622513],
    markers: [
      {
        street: 'Шепелюгинский переулок, 7',
        coordinates: [55.746796, 37.701107],
      },
      {
        street: 'Брянская, 3',
        coordinates: [55.744034, 37.562874],
      },
      {
        street: 'Мытная, 44',
        coordinates: [55.721001, 37.615884],
      },
      {
        street: 'Большой Кисельный переулок, 11',
        coordinates: [55.764799, 37.627472],
      },
    ],
  },
  {
    name: 'Санкт-Петербург',
    coordinates: [59.939099, 30.315877],
    markers: [
      {
        street: 'Полевая Сабировская, 46',
        coordinates: [59.994967, 30.274052],
      },
      {
        street: 'Полюстровский проспект, 32М',
        coordinates: [59.967989, 30.389350],
      },
      {
        street: 'Дальневосточный проспект, 42И',
        coordinates: [59.892812, 30.464396],
      },
      {
        street: 'Московский проспект, 163',
        coordinates: [59.867236, 30.319920],
      },
    ],
  },
  {
    name: 'Новосибирск',
    coordinates: [55.030204, 82.920430],
    markers: [
      {
        street: 'Авиастроителей, 1Б',
        coordinates: [55.070340, 82.966873],
      },
      {
        street: 'Кузьмы Минина, 21',
        coordinates: [55.074489, 82.936276],
      },
      {
        street: 'Ленина, 86',
        coordinates: [55.036623, 82.898816],
      },
      {
        street: 'Ленинградская, 363',
        coordinates: [55.002088, 82.985782],
      },
    ],
  },
  {
    name: 'Екатеринбург',
    coordinates: [56.838011, 60.597474],
    markers: [
      {
        street: 'Билимбаевская, 34к4',
        coordinates: [56.888264, 60.506825],
      },
      {
        street: 'Татищева, 18/2',
        coordinates: [56.835875, 60.564830],
      },
      {
        street: 'Хрустальная, 31',
        coordinates: [56.827444, 60.663411],
      },
      {
        street: 'Энергостроителей, 6',
        coordinates: [56.897148, 60.740558],
      },
    ],
  },
  {
    name: 'Казань',
    coordinates: [55.796127, 49.106414],
    markers: [
      {
        street: 'Право-Булачная, 35/2',
        coordinates: [55.790084, 49.110879],
      },
      {
        street: 'улица Профессора Камая, 8А',
        coordinates: [55.750418, 49.184424],
      },
      {
        street: 'Четаева, 50',
        coordinates: [55.822043, 49.120580],
      },
      {
        street: 'Космонавтов, 51',
        coordinates: [55.797701, 49.193524],
      },
    ],
  },
  {
    name: 'Самара',
    coordinates: [53.195878, 50.100202],
    markers: [
      {
        street: 'Фрунзе, 10',
        coordinates: [53.179529, 50.085820],
      },
      {
        street: 'улица Авроры, 92Б',
        coordinates: [53.192102, 50.190402],
      },
      {
        street: 'Стара Загора, 139А',
        coordinates: [53.234777, 50.221295],
      },
      {
        street: '8-й квартал, 19А',
        coordinates: [53.294330, 50.285093],
      },
    ],
  },
  {
    name: 'Уфа',
    coordinates: [54.735152, 55.958736],
    markers: [
      {
        street: 'Пугачёва, 156В',
        coordinates: [54.691188, 55.982676],
      },
      {
        street: 'Краснодонская, 33',
        coordinates: [54.739960, 55.961584],
      },
      {
        street: 'проспект Октября, 86',
        coordinates: [54.765399, 56.018294],
      },
      {
        street: 'Косогорная, 134',
        coordinates: [54.782890, 56.067010],
      },
    ],
  },
  {
    name: 'Набережные Челны',
    coordinates: [55.741272, 52.403662],
    markers: [
      {
        street: '7-й комплекс, 1',
        coordinates: [55.678027, 52.290969],
      },
      {
        street: 'Назыма Якупова, 27',
        coordinates: [55.683529, 52.328599],
      },
      {
        street: '6-й комплекс, 3',
        coordinates: [55.737400, 52.407408],
      },
      {
        street: 'Индустриальный проезд, 62/21',
        coordinates: [55.721473, 52.441014],
      },
    ],
  },
  {
    name: 'Ульяновск',
    coordinates: [54.314192, 48.403132],
    markers: [
      {
        street: '14-й Инженерный проезд, 23А',
        coordinates: [54.365972, 48.589901],
      },
      {
        street: 'Заводской проезд, 29',
        coordinates: [54.323991, 48.484717],
      },
      {
        street: 'Маяковского, 27',
        coordinates: [54.340046, 48.366409],
      },
      {
        street: 'проспект Гая, 78',
        coordinates: [54.263445, 48.325167],
      },
    ],
  },
];
