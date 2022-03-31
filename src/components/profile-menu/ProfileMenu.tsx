import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DropDownMenu from '../dropdown-menu/DropDownMenu';
import userAvatar from '../../assets/images/user-avatar.png';
import dropDownIcon from '../../assets/icons/dropdown-icon.svg';
import './ProfileMenu.scss';
import { setFocusedFieldAction } from '../../redux/actions/InputFieldAction';
import { outsideClickDetection } from '../../utils/OutsideClickDetection';

const ProfileMenu = () => {
  const [dropDownMenuActive, setDropDownMenuActive] = useState(false);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  outsideClickDetection(wrapperRef);

  const handleImageClick = () => {
    setDropDownMenuActive(!dropDownMenuActive);
    dispatch(setFocusedFieldAction('profile-menu'));
  };

  const handleSomeAction = () => {
    console.log('Some Action');
  };

  return (
    <div className="profile-menu" ref={wrapperRef}>
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
          <DropDownMenu data="" isActive={dropDownMenuActive} onClickFunc={handleSomeAction} />
        </div>
      </section>
    </div>
  );
};

export default ProfileMenu;
