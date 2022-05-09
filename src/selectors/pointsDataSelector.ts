import { IState } from '../types/state';

export const pointsDataSelector = (state: IState) => ({
  points: state.pointsData.points,
  cityCoords: state.pointsData.cityCoords,
  markerCoords: state.pointsData.markerCoords,
  isLoading: state.pointsData.isLoading,
  cities: state.pointsData.cities,
});
