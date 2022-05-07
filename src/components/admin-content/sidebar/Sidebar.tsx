import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import './Sidebar.scss';
import {
  BankOutlined,
  CarOutlined,
  DatabaseOutlined,
  EnvironmentOutlined, FileAddOutlined, SnippetsOutlined, UnorderedListOutlined,
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
import { successfullSaveSelector } from '../../../selectors/successfulSaveSelector';
import { successfullSaveStateAction } from '../../../redux/actions/SuccessfullSaveAction';
import { EMPTY_STRING } from '../../../constants/common';

const Sidebar = () => {
  const [currentWindowWidth, setCurrentWindowWidth] = useState(window.innerWidth);
  const adminSidebarMenuState = useSelector(adminSidebarMenuSelector);
  const successfulSaveState = useSelector(successfullSaveSelector);
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
    if (successfulSaveState.isActive) dispatch(successfullSaveStateAction(EMPTY_STRING, false));
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
          selectedKeys={[adminSidebarMenuState.selectedMenu]}
          mode="inline"
          onClick={handleMenuClick}
          inlineCollapsed={currentWindowWidth > 767 ? adminSidebarMenuState.isOpen : !adminSidebarMenuState.isOpen}
        >
          <Menu.Item
            key="orders"
            icon={<SnippetsOutlined />}
          >
            Заказы
          </Menu.Item>
          <Menu.Item
            key="car"
            icon={<CarOutlined />}
          >
            Карточка автомобиля
          </Menu.Item>
          <Menu.Item
            key="list-of-cars"
            icon={<UnorderedListOutlined />}
          >
            Список автомобилей
          </Menu.Item>
          <Menu.Item
            key="category"
            icon={<DatabaseOutlined />}
          >
            Категории автомобилей
          </Menu.Item>
          <Menu.Item
            key="cities"
            icon={<BankOutlined />}
          >
            Список городов
          </Menu.Item>
          <Menu.Item
            key="points"
            icon={<EnvironmentOutlined />}
          >
            Пункты выдачи
          </Menu.Item>
          <Menu.Item
            key="rate"
            icon={<UnorderedListOutlined />}
          >
            Список тарифов
          </Menu.Item>
          <Menu.Item
            key="entity"
            icon={<FileAddOutlined />}
          >
            Создать сущность
          </Menu.Item>
        </Menu>
      </div>
    </aside>
  );
};

export default Sidebar;
