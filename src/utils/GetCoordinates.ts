import { YMapsApi } from 'react-yandex-maps';
import { IPoint } from '../types/api';
import { IPointCityCoordsState } from '../types/state';
import { directGeocoding } from './DirectGeocoding';

export const GetCoordinates = async (maps: YMapsApi, data: Array<IPoint>) => {
  const cityCoordinates: IPointCityCoordsState[] = [];
  const markerCoordinates: IPointCityCoordsState[] = [];

  await Promise.all(data.map(async (point) => {
    if (point.cityId !== null) {
      await directGeocoding(maps, point.cityId.name)
        .then((response: YMapsApi) => {
          cityCoordinates.push({
            id: point.cityId.id,
            coordinates: response.geoObjects.get(0).geometry.getCoordinates(),
          });
        });
    }
  }));

  await Promise.all(data.map(async (point) => {
    if (point.cityId !== null) {
      await directGeocoding(maps, point.cityId.name, point.address)
        .then((response: YMapsApi) => {
          markerCoordinates.push({
            id: point.id,
            coordinates: response.geoObjects.get(0).geometry.getCoordinates(),
          });
        });
    }
  }));

  return [cityCoordinates, markerCoordinates];
};
