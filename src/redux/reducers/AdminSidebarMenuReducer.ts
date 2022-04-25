import produce from 'immer';
import { IAdminSidebarMenuState } from '../../types/state';
import { IAdminSidebarMenuActionType } from '../../types/actions';
import { ADMIN_SIDEBAR_MENU_STATE_CHANGE } from '../../constants/actions/adminSibebarMenu';

const initialState: IAdminSidebarMenuState = {
  isOpen: false,
};

const adminSidebarMenuStateChange = (draft: IAdminSidebarMenuState, isOpen?: boolean) => {
  draft.isOpen = isOpen || false;
  return draft;
};

export default (state = initialState, action: IAdminSidebarMenuActionType) => produce(
  state,
  (draft: IAdminSidebarMenuState) => {
    switch (action.type) {
      case ADMIN_SIDEBAR_MENU_STATE_CHANGE: return adminSidebarMenuStateChange(draft, action.menuOpen);
      default: return state;
    }
  },
);
