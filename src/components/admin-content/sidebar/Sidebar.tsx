import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import './Sidebar.scss';
import {
  DiffOutlined, EditOutlined, ProfileOutlined, UnorderedListOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import logoIcon from '../../../assets/icons/login-icon.svg';
import { windowWidth } from '../../../utils/WindowWidth';
import menuButton from '../../../assets/icons/menu_btn_black.svg';
import closeButton from '../../../assets/icons/menu_close_btn_black.svg';
import { adminSidebarMenuSelector } from '../../../selectors/adminSidebarMenuSelector';
import {
  adminSidebarChangeMenuAction,
  adminSidebarMenuStateAction,
} from '../../../redux/actions/AdminSidebarMenuAction';
import { adminCarCardChangeStateAction } from '../../../redux/actions/AdminCarCardAction';
import { ICarInfoData } from '../../../types/api';

const Sidebar = () => {
  const [currentWindowWidth, setCurrentWindowWidth] = useState(window.innerWidth);
  const adminSidebarMenuState = useSelector(adminSidebarMenuSelector);
  const dispatch = useDispatch();

  const classNameSidebar = cn('admin-sidebar__container', {
    'admin-sidebar__container_visible': adminSidebarMenuState.isOpen,
  });

  const wideScreenMenuButton = adminSidebarMenuState.isOpen ? menuButton : closeButton;
  const narrowScreenMenuButton = !adminSidebarMenuState.isOpen ? menuButton : closeButton;

  useEffect(() => {
    if (currentWindowWidth > 767 && currentWindowWidth < 1024) dispatch(adminSidebarMenuStateAction(true));
    else dispatch(adminSidebarMenuStateAction(false));
  }, [currentWindowWidth]);

  const handleMenuClick = (event: any) => {
    dispatch(adminSidebarChangeMenuAction(event.key));
    if (event.key === 'car') dispatch(adminCarCardChangeStateAction('create', {} as ICarInfoData));
    if (currentWindowWidth < 767) {
      dispatch(adminSidebarMenuStateAction(!adminSidebarMenuState.isOpen));
    }
    if (currentWindowWidth > 767 && currentWindowWidth < 1024 && !adminSidebarMenuState.isOpen) {
      dispatch(adminSidebarMenuStateAction(!adminSidebarMenuState.isOpen));
    }
  };

  const handleCollapsedMenuButtonClick = () => {
    dispatch(adminSidebarMenuStateAction(!adminSidebarMenuState.isOpen));
  };

  windowWidth(setCurrentWindowWidth);

  return (
    <aside className="admin-sidebar">
      <div className={classNameSidebar}>
        {currentWindowWidth < 1024
          ? (
            <header className="admin-sidebar__header">
              <img
                className="admin-sidebar__header__burger-menu"
                src={currentWindowWidth > 767 ? wideScreenMenuButton : narrowScreenMenuButton}
                alt="Open menu"
                onClick={handleCollapsedMenuButtonClick}
                role="presentation"
              />
            </header>
          )
          : (
            <header className="admin-sidebar__header">
              <img src={logoIcon} alt="logo" />
              <h3><a className="login-form__header__link" href="/need-for-drive-i2">Need for drive</a></h3>
            </header>
          )}
        <Menu
          className="admin-sidebar__menu"
          defaultSelectedKeys={['orders']}
          mode="inline"
          onClick={handleMenuClick}
          inlineCollapsed={currentWindowWidth > 767 ? adminSidebarMenuState.isOpen : !adminSidebarMenuState.isOpen}
        >
          <Menu.Item
            key="orders"
            icon={<DiffOutlined />}
          >
            Заказы
          </Menu.Item>
          <Menu.Item
            key="car"
            icon={<EditOutlined />}
          >
            Карточка автомобиля
          </Menu.Item>
          <Menu.Item
            key="list-of-cars"
            icon={<UnorderedListOutlined />}
          >
            Список авто
          </Menu.Item>
          <Menu.Item
            key="new"
            icon={<ProfileOutlined />}
          >
            Новая сущность
          </Menu.Item>
        </Menu>
      </div>
    </aside>
  );
};

export default Sidebar;
