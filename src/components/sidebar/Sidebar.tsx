import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import menuButton from '../../assets/icons/menu_btn.svg';
import './Sidebar.scss';
import { IState } from '../../types/state';
import { sidebarMenuAction } from '../../redux/actions/SidebarMenuAction';
import LangButton from '../lang-button/LangButton';

interface ISidebarProps {
  isOpen: boolean;
  sidebarMenu: (isOpen: boolean) => void,
}

const Sidebar: FC<ISidebarProps> = ({ isOpen, sidebarMenu }) => {
  const handleSidebarBtnClick = () => {
    sidebarMenu(!isOpen);
    document.body.style.overflow = 'hidden';
  };

  return (
    <aside className="sidebar">
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
