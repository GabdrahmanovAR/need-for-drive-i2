import React, { BaseSyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DropDownMenu from '../dropdown-menu/DropDownMenu';
import userAvatar from '../../assets/images/user-avatar.png';
import dropDownIcon from '../../assets/icons/dropdown-icon.svg';
import './ProfileMenu.scss';
import { setFocusedFieldAction } from '../../redux/actions/FocusedItemAction';
import { EMPTY_STRING } from '../../constants/common';
import { ADMIN_LOGIN_URL } from '../../constants/api';

const ProfileMenu = () => {
  const [isDropDownMenuActive, setIsDropDownMenuActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageClick = () => {
    setIsDropDownMenuActive(!isDropDownMenuActive);
    dispatch(setFocusedFieldAction(isDropDownMenuActive ? EMPTY_STRING : 'profile-menu'));
  };

  const handleMenuClick = (event: BaseSyntheticEvent) => {
    dispatch(setFocusedFieldAction(EMPTY_STRING));
    setIsDropDownMenuActive(false);
    if (event.target.innerText === 'Выйти') {
      localStorage.removeItem('auth-token');
      navigate(ADMIN_LOGIN_URL);
    }
  };

  return (
    <div className="profile-menu">
      <section className="profile-menu__info">
        <div className="profile-menu__info__avatar">
          <img src={userAvatar} alt="User avatar" />
        </div>
        <div className="profile-menu__info__name">Admin</div>
      </section>
      <section className="profile-menu__dropdown-menu">
        <div>
          <img
            src={dropDownIcon}
            alt="Dropdown menu"
            onClick={handleImageClick}
            role="presentation"
          />
        </div>
      </section>
      <DropDownMenu data="" isActive={isDropDownMenuActive} onClickFunc={handleMenuClick} />
    </div>
  );
};

export default ProfileMenu;
