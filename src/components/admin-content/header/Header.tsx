import React, { BaseSyntheticEvent, useState } from 'react';
import './Header.scss';
import InputField from '../../input-field/InputField';
import searchIcon from '../../../assets/icons/search-icon.svg';
import Notifications from '../../notifications/Notifications';
import ProfileMenu from '../../profile-menu/ProfileMenu';
import { EMPTY_STRING } from '../../../constants/common';

const Header = () => {
  const [searchText, setSearchText] = useState(EMPTY_STRING);

  const handleSearchInput = (event: BaseSyntheticEvent) => {
    setSearchText(event.target.value);
  };

  const handleResetButtonClick = () => {
    setSearchText(EMPTY_STRING);
  };

  return (
    <main className="admin-header">
      <div className="admin-header__search">
        <img src={searchIcon} alt="Search icon" />
        <InputField
          title=""
          fieldValue={searchText}
          placeholder="Поиск ..."
          id="search-field"
          onInputFunc={handleSearchInput}
          onClickBtnFunc={handleResetButtonClick}
        />
      </div>
      <div className="admin-header__notice">
        <Notifications />
      </div>
      <div className="admin-header__profile">
        <ProfileMenu />
      </div>
    </main>
  );
};

export default Header;
