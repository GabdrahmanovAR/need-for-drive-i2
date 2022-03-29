import produce from 'immer';
import { ISidebarMenuState } from '../../types/state';
import { ISidebarMenuActionType } from '../../types/actions';
import { SIDEBAR_MENU_STATE_CHANGE } from '../../constants/actions/sidebarMenu';

const initialState: ISidebarMenuState = {
  isOpen: false,
};

const sidebarMenuStateChange = (draft: ISidebarMenuState, isOpen?: boolean) => {
  draft.isOpen = isOpen || false;
  return draft;
};

export default (state = initialState, action: ISidebarMenuActionType) => produce(
  state,
  (draft: ISidebarMenuState) => {
    switch (action.type) {
      case SIDEBAR_MENU_STATE_CHANGE: return sidebarMenuStateChange(draft, action.menuOpen);
      default: return state;
    }
  },
);
