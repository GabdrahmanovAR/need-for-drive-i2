import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DropDownMenu from '../dropdown-menu/DropDownMenu';
import notificationIcon from '../../assets/icons/notifications.svg';
import './Notifications.scss';
import { outsideClickDetection } from '../../utils/OutsideClickDetection';
import { setFocusedFieldAction } from '../../redux/actions/FocusedItemAction';

const Notifications = () => {
  const [isDropDownMenuActive, setIsDropDownMenuActive] = useState(false);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  outsideClickDetection(wrapperRef, setIsDropDownMenuActive);

  const handleImageClick = () => {
    setIsDropDownMenuActive(!isDropDownMenuActive);
    dispatch(setFocusedFieldAction('notifications'));
  };

  const handleSomeAction = () => {
    console.log('Some Action');
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
        <DropDownMenu data="" isActive={isDropDownMenuActive} onClickFunc={handleSomeAction} />
      </div>
    </div>
  );
};

export default Notifications;
