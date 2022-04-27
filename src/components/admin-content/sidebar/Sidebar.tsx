import React, {
  FC, SetStateAction, useEffect, useState,
} from 'react';
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
import { adminSidebarMenuAction } from '../../../redux/actions/AdminSidebarMenuAction';

interface ISideBarProps {
  setMenu: SetStateAction<any>;
}

const Sidebar: FC<ISideBarProps> = ({ setMenu }) => {
  const [currentWindowWidth, setCurrentWindowWidth] = useState(window.innerWidth);
  const adminSidebarMenuState = useSelector(adminSidebarMenuSelector);
  const dispatch = useDispatch();

  const classNameSidebar = cn('admin-sidebar__container', {
    'admin-sidebar__container_visible': adminSidebarMenuState.isOpen,
  });

  const wideScreenMenuButton = adminSidebarMenuState.isOpen ? menuButton : closeButton;
  const narrowScreenMenuButton = !adminSidebarMenuState.isOpen ? menuButton : closeButton;

  useEffect(() => {
    if (currentWindowWidth > 767 && currentWindowWidth < 1024) dispatch(adminSidebarMenuAction(true));
    else dispatch(adminSidebarMenuAction(false));
  }, [currentWindowWidth]);

  const handleMenuClick = (event: any) => {
    setMenu(event.key);
    if (currentWindowWidth < 767) {
      dispatch(adminSidebarMenuAction(!adminSidebarMenuState.isOpen));
    }
    if (currentWindowWidth > 767 && currentWindowWidth < 1024 && !adminSidebarMenuState.isOpen) {
      dispatch(adminSidebarMenuAction(!adminSidebarMenuState.isOpen));
    }
  };

  const handleCollapsedMenuButtonClick = () => {
    dispatch(adminSidebarMenuAction(!adminSidebarMenuState.isOpen));
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
            key="list-of-entities"
            icon={<ProfileOutlined />}
          >
            Список основных сущностей
          </Menu.Item>
        </Menu>
      </div>
    </aside>
  );
};

export default Sidebar;
