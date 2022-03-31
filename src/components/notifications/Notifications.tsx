import React, { useState } from 'react';
import DropDownMenu from '../dropdown-menu/DropDownMenu';
import notificationIcon from '../../assets/icons/notifications.svg';
import './Notifications.scss';

const Notifications = () => {
  const [dropDownMenuActive, setDropDownMenuActive] = useState(false);

  const handleImageClick = () => {
    setDropDownMenuActive(!dropDownMenuActive);
    console.log(`Bell clicked - ${!dropDownMenuActive}`);
  };

  const handleSomeAction = () => {
    console.log('Some Action');
  };

  return (
    <div className="notifications">
      <div className="notifications__bell">
        <img
          src={notificationIcon}
          alt="Notice icon"
          onClick={handleImageClick}
          role="presentation"
        />
        <div className="notifications__bell__count">2</div>
        <DropDownMenu data="" isActive={dropDownMenuActive} onClickFunc={handleSomeAction} />
      </div>
    </div>
  );
};

export default Notifications;
