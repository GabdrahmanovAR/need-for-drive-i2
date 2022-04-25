import { IState } from '../types/state';

export const adminSidebarMenuSelector = (state: IState) => ({
  isOpen: state.adminSidebarMenu.isOpen,
});
