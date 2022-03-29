import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import menuButton from '../../assets/icons/menu_btn.svg';
import './Sidebar.scss';
import { IState } from '../../types/state';
import { sidebarMenuAction } from '../../redux/actions/SidebarMenuAction';
import LangButton from '../lang-button/LangButton';
import SidebarMenu from './sidebar-menu/SidebarMenu';
import { ADMIN_URL_PATH } from '../../constants/common';

interface ISidebarProps {
  isOpen: boolean;
  sidebarMenu: (isOpen: boolean) => void,
}

const Sidebar: FC<ISidebarProps> = ({ isOpen, sidebarMenu }) => {
  const locationPath = useLocation();

  const handleSidebarBtnClick = () => {
    sidebarMenu(!isOpen);
    document.body.style.overflow = 'hidden';
  };

  return (
    <aside className={`sidebar ${locationPath.pathname.includes(ADMIN_URL_PATH) && 'sidebar_hide'}`}>
      <header>
        <button
          className="sidebar__button"
          type="button"
          onClick={handleSidebarBtnClick}
        >
          <img src={menuButton} alt="Close Icon" />
        </button>
      </header>
      <footer>
        <LangButton />
      </footer>
      <SidebarMenu />
    </aside>
  );
};
export default connect(
  (state: IState) => ({
    isOpen: state.sidebarMenu.isOpen,
  }),
  (dispatch) => ({
    sidebarMenu: bindActionCreators(sidebarMenuAction, dispatch),
  }),
)(Sidebar);
