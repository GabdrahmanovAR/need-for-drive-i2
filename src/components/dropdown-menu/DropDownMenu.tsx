import React, { BaseSyntheticEvent, FC } from 'react';
import { useSelector } from 'react-redux';
import './DropDownMenu.scss';
import { EMPTY_STRING } from '../../constants/common';
import { inputFieldSelector } from '../../selectors/inputFieldSelector';
import { orderInfoSelector } from '../../selectors/orderInfoSelector';
import { IPointsDataState } from '../../types/state';
import { IPoint } from '../../types/api';

interface IDropDownMenu {
  pointData: IPointsDataState,
  isActive: boolean;
  onClickFunc: (e: BaseSyntheticEvent) => void,
  cityName?: string,
}

const DropDownMenu: FC<IDropDownMenu> = (props) => {
  const {
    isActive,
    pointData,
    onClickFunc,
    cityName = EMPTY_STRING,
  } = props;
  const inputFieldState = useSelector(inputFieldSelector);
  const { location } = useSelector(orderInfoSelector);

  return (
    <div className="drop-down-menu">
      <nav className={`drop-down-menu__list ${isActive && 'drop-down-menu__list_active'}`}>
        <ul>

          {inputFieldState.focusedField === 'city-field'
            ? (pointData.data.map((someCity: IPoint, index: number) => {
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
            : (pointData.data.map((someMarker: IPoint, index: number) => {
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
