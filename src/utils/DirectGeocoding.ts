import { YMapsApi } from 'react-yandex-maps';
import { EMPTY_STRING } from '../constants/common';

export const directGeocoding = (maps: YMapsApi, city: string, address?: string): Promise<YMapsApi> => (
  maps.geocode(address === EMPTY_STRING ? city : `${city}, ${address}`, { results: 1 })
);
