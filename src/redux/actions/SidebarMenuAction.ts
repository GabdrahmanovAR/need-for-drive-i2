import { Dispatch } from 'redux';
import { ISidebarMenuActionType } from '../../types/actions';
import { SIDEBAR_MENU_STATE_CHANGE } from '../../constants/actions/sidebarMenu';

const sidebarMenuStateChange = (isOpen: boolean): ISidebarMenuActionType => ({
  type: SIDEBAR_MENU_STATE_CHANGE,
  menuOpen: isOpen,
});

export const sidebarMenuAction = (isOpen: boolean) => (dispatch: Dispatch) => {
  dispatch(sidebarMenuStateChange(isOpen));
};
