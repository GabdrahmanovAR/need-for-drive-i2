import { IPointCityCoordsState, IPointMarkerCoordsState, IPointsDataState } from '../types/state';

export const GetPointCoordinates = (pointsDataState: IPointsDataState, desiredPointId: string, key: string): number[] => {
  let coordinates: number[] = [];

  if (key === 'city') {
    pointsDataState.cityCoords.forEach((city: IPointCityCoordsState) => {
      if (city.id === desiredPointId) coordinates = city.coordinates;
    });
  }
  if (key === 'marker') {
    pointsDataState.markerCoords.forEach((marker: IPointMarkerCoordsState) => {
      if (marker.id === desiredPointId) coordinates = marker.coordinates;
    });
  }

  return coordinates;
};
