import React, {
  BaseSyntheticEvent, useState,
} from 'react';
import './Header.scss';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import InputField from '../../input-field/InputField';
import searchIcon from '../../../assets/icons/search-icon.svg';
import Notifications from '../../notifications/Notifications';
import ProfileMenu from '../../profile-menu/ProfileMenu';
import { EMPTY_STRING } from '../../../constants/common';
import menuButton from '../../../assets/icons/menu_btn_black.svg';
import { adminSidebarMenuAction } from '../../../redux/actions/AdminSidebarMenuAction';

const Header = () => {
  const [searchText, setSearchText] = useState(EMPTY_STRING);
  const [searchFieldOpen, setSearchFieldOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSearchInput = (event: BaseSyntheticEvent) => {
    setSearchText(event.target.value);
  };

  const handleMenuButtonClick = () => {
    dispatch(adminSidebarMenuAction(true));
  };

  const handleResetButtonClick = () => {
    setSearchText(EMPTY_STRING);
  };

  const handleSearchIconClick = () => {
    setSearchFieldOpen(true);
  };

  const handleModalCloseButtonClick = () => {
    setSearchFieldOpen(false);
  };

  return (
    <main className="admin-header">
      <div className="admin-header__burger-menu">
        <img
          src={menuButton}
          alt="Open menu"
          onClick={handleMenuButtonClick}
          role="presentation"
        />
      </div>
      <div className="admin-header__search">
        <img
          src={searchIcon}
          alt="Search icon"
          onClick={handleSearchIconClick}
          role="presentation"
        />
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
      <Modal
        visible={searchFieldOpen}
        footer={null}
        closable
        onCancel={handleModalCloseButtonClick}
      >
        <div className="admin-header__modal-search">
          <InputField
            title=""
            fieldValue={searchText}
            placeholder="Поиск ..."
            id="search-field"
            onInputFunc={handleSearchInput}
            onClickBtnFunc={handleResetButtonClick}
          />
        </div>
      </Modal>
    </main>
  );
};

export default Header;
