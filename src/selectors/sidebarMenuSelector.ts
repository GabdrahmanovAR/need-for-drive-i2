import { IState } from '../types/state';

export const sidebarMenuSelector = (state: IState) => ({
  isOpen: state.sidebarMenu.isOpen,
});
