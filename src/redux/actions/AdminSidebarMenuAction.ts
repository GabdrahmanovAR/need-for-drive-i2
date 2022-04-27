import { Dispatch } from 'redux';
import { IAdminSidebarMenuActionType } from '../../types/actions';
import { ADMIN_SIDEBAR_MENU_CHANGE, ADMIN_SIDEBAR_MENU_STATE_CHANGE } from '../../constants/actions/adminSibebarMenu';

const adminSidebarMenuStateChange = (isOpen: boolean): IAdminSidebarMenuActionType => ({
  type: ADMIN_SIDEBAR_MENU_STATE_CHANGE,
  menuOpen: isOpen,
});

const adminSidebarMenuChange = (menu: string): IAdminSidebarMenuActionType => ({
  type: ADMIN_SIDEBAR_MENU_CHANGE,
  selectedMenu: menu,
});

export const adminSidebarMenuStateAction = (isOpen: boolean) => (dispatch: Dispatch) => {
  dispatch(adminSidebarMenuStateChange(isOpen));
};

export const adminSidebarChangeMenuAction = (menu: string) => (dispatch: Dispatch) => {
  dispatch(adminSidebarMenuChange(menu));
};
