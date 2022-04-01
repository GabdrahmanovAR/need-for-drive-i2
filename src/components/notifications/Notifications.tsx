import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DropDownMenu from '../dropdown-menu/DropDownMenu';
import notificationIcon from '../../assets/icons/notifications.svg';
import './Notifications.scss';
import { outsideClickDetection } from '../../utils/OutsideClickDetection';
import { setFocusedFieldAction } from '../../redux/actions/FocusedItemAction';
import { EMPTY_STRING } from '../../constants/common';

const Notifications = () => {
  const [isDropDownMenuActive, setIsDropDownMenuActive] = useState(false);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  outsideClickDetection(wrapperRef, setIsDropDownMenuActive);

  const handleImageClick = () => {
    setIsDropDownMenuActive(!isDropDownMenuActive);
    dispatch(setFocusedFieldAction('notifications'));
  };

  const handleMenuClick = () => {
    setIsDropDownMenuActive(false);
    dispatch(setFocusedFieldAction(EMPTY_STRING));
  };

  return (
    <div className="notifications" ref={wrapperRef}>
      <div className="notifications__bell">
        <img
          src={notificationIcon}
          alt="Notice icon"
          onClick={handleImageClick}
          role="presentation"
        />
        <div className="notifications__bell__count">2</div>
        <DropDownMenu data="" isActive={isDropDownMenuActive} onClickFunc={handleMenuClick} />
      </div>
    </div>
  );
};

export default Notifications;
