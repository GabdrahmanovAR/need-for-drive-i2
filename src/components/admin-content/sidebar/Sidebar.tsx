import React from 'react';
import { Menu } from 'antd';
import './Sidebar.scss';
import { DiffOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import logoIcon from '../../../assets/icons/login-icon.svg';

const Sidebar = () => (
  <aside className="admin-sidebar">
    <header className="admin-sidebar__header">
      <img src={logoIcon} alt="logo" />
      <h3><a className="login-form__header__link" href="/need-for-drive-i2">Need for drive</a></h3>
    </header>
    <Menu
      className="admin-sidebar__menu"
      defaultSelectedKeys={['1']}
      style={{ width: 285 }}
      mode="inline"
    >
      <Menu.Item
        key="1"
        icon={<DiffOutlined style={{ color: '#CACEDB' }} />}
      >
        Заказы
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<EditOutlined style={{ color: '#CACEDB' }} />}
      >
        Карточка автомобиля
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<UnorderedListOutlined style={{ color: '#CACEDB' }} />}
      >
        Список авто
      </Menu.Item>
    </Menu>
  </aside>
);

export default Sidebar;
