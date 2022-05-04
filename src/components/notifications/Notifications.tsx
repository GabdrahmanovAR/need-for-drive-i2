import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import Modal from 'antd/lib/modal';
import DropDownMenu from '../dropdown-menu/DropDownMenu';
import notificationIcon from '../../assets/icons/notifications.svg';
import './Notifications.scss';
import { setFocusedFieldAction } from '../../redux/actions/FocusedItemAction';
import { EMPTY_STRING } from '../../constants/common';

const Notifications = () => {
  const [isDropDownMenuActive, setIsDropDownMenuActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleImageClick = () => {
    setIsDropDownMenuActive(!isDropDownMenuActive);
    dispatch(setFocusedFieldAction(isDropDownMenuActive ? EMPTY_STRING : 'notifications'));
  };

  const handleMenuClick = () => {
    setIsDropDownMenuActive(false);
    dispatch(setFocusedFieldAction(EMPTY_STRING));
    setIsModalVisible(true);
  };

  const handleCancelClick = () => {
    setIsModalVisible(false);
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
      </div>
      <Modal
        title="Сообщение"
        visible={isModalVisible}
        closable
        onCancel={handleCancelClick}
        footer={[
          <Button key="back" onClick={handleCancelClick}>
            Назад
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <DropDownMenu data="" isActive={isDropDownMenuActive} onClickFunc={handleMenuClick} />
    </div>
  );
};

export default Notifications;
