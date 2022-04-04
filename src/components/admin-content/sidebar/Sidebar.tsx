import React, { FC, SetStateAction } from 'react';
import { Menu } from 'antd';
import './Sidebar.scss';
import { DiffOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import logoIcon from '../../../assets/icons/login-icon.svg';

interface ISideBarProps {
  setMenu: SetStateAction<any>;
}

const Sidebar: FC<ISideBarProps> = ({ setMenu }) => {
  const handleMenuClick = (event: any) => {
    setMenu(event.key);
  };

  return (
    <aside className="admin-sidebar">
      <header className="admin-sidebar__header">
        <img src={logoIcon} alt="logo" />
        <h3><a className="login-form__header__link" href="/need-for-drive-i2">Need for drive</a></h3>
      </header>
      <Menu
        className="admin-sidebar__menu"
        defaultSelectedKeys={['orders']}
        style={{ width: 285 }}
        mode="inline"
        onClick={handleMenuClick}
      >
        <Menu.Item
          key="orders"
          icon={<DiffOutlined style={{ color: '#CACEDB' }} />}
        >
          Заказы
        </Menu.Item>
        <Menu.Item
          key="car"
          icon={<EditOutlined style={{ color: '#CACEDB' }} />}
        >
          Карточка автомобиля
        </Menu.Item>
        <Menu.Item
          key="list-of-cars"
          icon={<UnorderedListOutlined style={{ color: '#CACEDB' }} />}
        >
          Список авто
        </Menu.Item>
      </Menu>
    </aside>
  );
};

export default Sidebar;
