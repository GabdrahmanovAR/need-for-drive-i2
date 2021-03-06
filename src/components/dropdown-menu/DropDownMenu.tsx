import React, { BaseSyntheticEvent, FC } from 'react';
import { useSelector } from 'react-redux';
import './DropDownMenu.scss';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { EMPTY_STRING } from '../../constants/common';
import { focusedItemSelector } from '../../selectors/focusedItemSelector';
import { orderInfoSelector } from '../../selectors/orderInfoSelector';
import { IPoint } from '../../types/api';

interface IDropDownMenu {
  data: any,
  isActive: boolean;
  onClickFunc: (e: BaseSyntheticEvent) => void,
  cityName?: string,
}

const DropDownMenu: FC<IDropDownMenu> = (props) => {
  const {
    isActive,
    data,
    onClickFunc,
    cityName = EMPTY_STRING,
  } = props;
  const focusedItemState = useSelector(focusedItemSelector);
  const { location } = useSelector(orderInfoSelector);
  const locationPath = useLocation();

  const classNameAdminMenu = cn('drop-down-menu__list', {
    'drop-down-menu__list_active': isActive,
    'drop-down-menu__list_active-admin': focusedItemState.item === 'profile-menu',
  });

  const classNameDefaultMenu = cn('drop-down-menu__list', {
    'drop-down-menu__list_active': isActive,
  });

  if (locationPath.pathname.includes('admin')) {
    return (
      <div className="drop-down-menu">
        <nav
          className={classNameAdminMenu}
        >
          {focusedItemState.item === 'profile-menu'
            ? (
              <ul>
                <li role="presentation" onClick={onClickFunc} className="list-item">Изменить профиль</li>
                <li role="presentation" onClick={onClickFunc} className="list-item">Выйти</li>
              </ul>
            )
            : (
              <ul>
                <li role="presentation" onClick={onClickFunc} className="list-item">Some text</li>
                <li role="presentation" onClick={onClickFunc} className="list-item">Some text</li>
              </ul>
            )}
        </nav>
      </div>
    );
  }

  return (
    <div className="drop-down-menu">
      <nav className={classNameDefaultMenu}>
        <ul>
          {focusedItemState.item === 'city-field'
            ? (data.points.data.data.map((someCity: IPoint, index: number) => {
              if (someCity.cityId === null || someCity.cityId.name.slice(0, cityName.length) !== cityName) return null;
              return (
                <li
                  className="list-item"
                  onClick={onClickFunc}
                  role="presentation"
                  key={`city-${index}`}
                >
                  {someCity.cityId !== null && someCity.cityId.name}
                </li>
              );
            }))
            : (data.points.data.data.map((someMarker: IPoint, index: number) => {
              if (location.cityName === EMPTY_STRING && someMarker.cityId !== null) {
                return (
                  <li
                    className="list-item"
                    onClick={onClickFunc}
                    role="presentation"
                    key={`marker-${index}`}
                  >
                    {someMarker.address}
                  </li>
                );
              }
              if (someMarker.cityId !== null && someMarker.cityId.name === location.cityName) {
                return (
                  <li
                    className="list-item"
                    onClick={onClickFunc}
                    role="presentation"
                    key={`marker-${index}`}
                  >
                    {someMarker.address}
                  </li>
                );
              }
              return null;
            }))}
        </ul>
      </nav>
    </div>
  );
};

export default DropDownMenu;
