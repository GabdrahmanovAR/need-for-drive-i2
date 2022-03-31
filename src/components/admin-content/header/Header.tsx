import React from 'react';
import './Header.scss';
import InputField from '../../input-field/InputField';
import searchIcon from '../../../assets/icons/search-icon.svg';
import Notifications from '../../notifications/Notifications';
import ProfileMenu from '../../profile-menu/ProfileMenu';

const Header = () => (
  <main className="admin-header">
    <div className="admin-header__search">
      <img src={searchIcon} alt="Search icon" />
      <InputField title="" fieldValue="" placeholder="Поиск ..." id="search-field" />
    </div>
    <div className="admin-header__notice">
      <Notifications />
    </div>
    <div className="admin-header__profile">
      <ProfileMenu />
    </div>
  </main>
);

export default Header;
