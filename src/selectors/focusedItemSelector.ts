import { IState } from '../types/state';

export const focusedItemSelector = (state: IState) => ({
  item: state.focusedItem.item,
  isActive: state.focusedItem.isActive,
});
