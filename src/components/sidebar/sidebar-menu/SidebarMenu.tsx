import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useLocation } from 'react-router-dom';
import telegramIcon from '../../../assets/icons/telegram.svg';
import './SidebarMenu.scss';
import { IState } from '../../../types/state';
import { sidebarMenuAction } from '../../../redux/actions/SidebarMenuAction';
import menuCloseButton from '../../../assets/icons/menu_close_btn.svg';
import LangButton from '../../lang-button/LangButton';

interface ISidebarMenuProps {
  isOpen: boolean;
  sidebarMenu: (isOpen: boolean) => void,
}

const SidebarMenu: FC<ISidebarMenuProps> = ({ isOpen, sidebarMenu }) => {
  const location = useLocation();
  const regexPath = new RegExp(/\/order\/[A-z]*/);

  const handleSidebarBtnClick = () => {
    sidebarMenu(!isOpen);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className={`sidebar-menu ${isOpen && 'sidebar-menu_open'}`}>
      <div className="sidebar-menu__btn-block">
        <button
          className="sidebar-menu__button"
          type="button"
          onClick={handleSidebarBtnClick}
        >
          <img src={menuCloseButton} alt="Open Icon" />
        </button>
      </div>
      <section className="sidebar-menu__navigation">
        <nav>
          <ul className="sidebar-menu__navigation__list">
            <li>ПАРКОВКА</li>
            <li>СТРАХОВКА</li>
            <li>БЕНЗИН</li>
            <li>ОБСЛУЖИВАНИЕ</li>
          </ul>
          <div className="sidebar-menu__social-network">
            <img src={telegramIcon} alt="Telegram" />
          </div>
        </nav>
      </section>
      <footer className="sidebar-menu__lang-btn">
        <LangButton />
      </footer>
      <section className={`${!regexPath.test(location.pathname) && 'sidebar-menu__empty'}`} />
    </div>
  );
};

export default connect(
  (state: IState) => ({
    isOpen: state.sidebarMenu.isOpen,
  }),
  (dispatch) => ({
    sidebarMenu: bindActionCreators(sidebarMenuAction, dispatch),
  }),
)(SidebarMenu);
