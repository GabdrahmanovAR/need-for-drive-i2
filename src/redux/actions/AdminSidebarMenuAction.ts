import { Dispatch } from 'redux';
import { IAdminSidebarMenuActionType } from '../../types/actions';
import { ADMIN_SIDEBAR_MENU_STATE_CHANGE } from '../../constants/actions/adminSibebarMenu';

const adminSidebarMenuStateChange = (isOpen: boolean): IAdminSidebarMenuActionType => ({
  type: ADMIN_SIDEBAR_MENU_STATE_CHANGE,
  menuOpen: isOpen,
});

export const adminSidebarMenuAction = (isOpen: boolean) => (dispatch: Dispatch) => {
  dispatch(adminSidebarMenuStateChange(isOpen));
};
