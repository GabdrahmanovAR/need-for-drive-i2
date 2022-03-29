import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import menuButton from '../../assets/icons/menu_btn_black.svg';
import locationIcon from '../../assets/icons/location-icon.svg';
import { sidebarMenuAction } from '../../redux/actions/SidebarMenuAction';
import './Header.scss';
import { EMPTY_STRING } from '../../constants/common';
import { sidebarMenuSelector } from '../../selectors/sidebarMenuSelector';

interface IHeaderProps {
  customClass?: string,
}

const Header: FC<IHeaderProps> = ({ customClass }) => {
  const sidebarMenuState = useSelector(sidebarMenuSelector);
  const dispatch = useDispatch();

  const handleMenuBtnClick = () => {
    dispatch(sidebarMenuAction(!sidebarMenuState.isOpen));
    document.body.style.overflow = 'hidden';
  };

  return (
    <header className={`header ${customClass !== EMPTY_STRING && customClass}`}>
      <section className="header__title">
        <button
          className="header__menu-btn"
          type="button"
          onClick={handleMenuBtnClick}
        >
          <img src={menuButton} alt="Close Icon" />
        </button>
        <h1><a className="header__title__link" href="/need-for-drive-iteration-1">Need for drive</a></h1>
      </section>
      <div className="header__location">
        <img src={locationIcon} alt="Location icon" />
        <span>Ульяновск</span>
      </div>
    </header>
  );
};

export default Header;
