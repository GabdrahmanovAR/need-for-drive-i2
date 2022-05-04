import produce from 'immer';
import { IAdminSidebarMenuState } from '../../types/state';
import { IAdminSidebarMenuActionType } from '../../types/actions';
import { ADMIN_SIDEBAR_MENU_CHANGE, ADMIN_SIDEBAR_MENU_STATE_CHANGE } from '../../constants/actions/adminSibebarMenu';
import { EMPTY_STRING } from '../../constants/common';

const initialState: IAdminSidebarMenuState = {
  isOpen: false,
  selectedMenu: 'orders',
};

const adminSidebarMenuStateChange = (draft: IAdminSidebarMenuState, isOpen?: boolean) => {
  draft.isOpen = isOpen || false;
  return draft;
};

const adminSidebarMenuChange = (draft: IAdminSidebarMenuState, menu?: string) => {
  draft.selectedMenu = menu || EMPTY_STRING;
  return draft;
};

export default (state = initialState, action: IAdminSidebarMenuActionType) => produce(
  state,
  (draft: IAdminSidebarMenuState) => {
    switch (action.type) {
      case ADMIN_SIDEBAR_MENU_STATE_CHANGE: return adminSidebarMenuStateChange(draft, action.menuOpen);
      case ADMIN_SIDEBAR_MENU_CHANGE: return adminSidebarMenuChange(draft, action.selectedMenu);
      default: return state;
    }
  },
);
