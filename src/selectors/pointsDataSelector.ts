import { IState } from '../types/state';

export const pointsDataSelector = (state: IState) => ({
  data: state.pointsData.data,
  cityCoords: state.pointsData.cityCoords,
  markerCoords: state.pointsData.markerCoords,
  isLoading: state.pointsData.isLoading,
});
