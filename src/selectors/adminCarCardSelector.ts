import { IState } from '../types/state';

export const adminCarCardSelector = (state: IState) => ({
  cardState: state.adminCarCard.cardState,
  data: state.adminCarCard.data,
});
