import React, {
  BaseSyntheticEvent, FC, useEffect, useState,
} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  CITY_KEY, EMPTY_ARRAY, EMPTY_STRING, MARKER_KEY, MOSCOW_CITY_COORDS,
} from '../../../constants/common';
import './LocationTab.scss';
import YandexMaps from '../../yandex-maps/YandexMaps';
import { IState } from '../../../types/state';
import { changeLocationDataAction, resetCarInfoAction } from '../../../redux/actions/OrderInfoAction';
import InputField from '../../input-field/InputField';
import DropDownMenu from '../../dropdown-menu/DropDownMenu';
import {
  changeAdvTabStateAction,
  changeLocTabStateAction,
  changeModelTabStateAction,
} from '../../../redux/actions/OrderStepAction';
import { pointsDataSelector } from '../../../selectors/pointsDataSelector';
import { IPoint } from '../../../types/api';
import { GetPointCoordinates } from '../../../utils/GetPointCoordinates';
import { orderInfoSelector } from '../../../selectors/orderInfoSelector';
import { resetRadioBtnAction } from '../../../redux/actions/RadioButtonAction';

interface ILocationTabProps {
  cityName: string,
  markerName: string,
  changeLocationData: (name: string, coords: number[], id: string, key: string) => void,
}

const LocationTab: FC<ILocationTabProps> = ({ cityName, markerName, changeLocationData }) => {
  const pointsDataState = useSelector((pointsDataSelector));
  const orderInfoState = useSelector(orderInfoSelector);
  const dispatch = useDispatch();

  const initialCityState = orderInfoState.location.cityName !== EMPTY_STRING ? orderInfoState.location.cityName : EMPTY_STRING;
  const initialMarkerState = orderInfoState.location.markerName !== EMPTY_STRING ? orderInfoState.location.markerName : EMPTY_STRING;
  const [city, setCity] = useState(initialCityState);
  const [marker, setMarker] = useState(initialMarkerState);

  const [citiesMenuActive, setCitiesMenuActive] = useState(false);
  const [markerMenuActive, setMarkerMenuActive] = useState(false);
  const cyrillicRegexp = new RegExp(/^[А-я]*$/);

  useEffect(() => {
    if (cityName !== EMPTY_STRING) {
      setCity(cityName);
    }
    if (markerName !== EMPTY_STRING) {
      setMarker(markerName);
    }
  }, [cityName, markerName]);

  useEffect(() => {
    if (city === EMPTY_STRING) return;
    pointsDataState.data.forEach((someCity: IPoint) => {
      if (someCity.cityId !== null && someCity.cityId.name === city) {
        const cityCoordinates = GetPointCoordinates(pointsDataState, someCity.cityId.id, CITY_KEY);
        changeLocationData(someCity.cityId.name, cityCoordinates, someCity.cityId.id, CITY_KEY);
      }
    });
  }, [city]);

  useEffect(() => {
    if (marker === EMPTY_STRING) return;
    pointsDataState.data.forEach((point: IPoint) => {
      if (point.cityId !== null && point.address === marker) {
        const cityCoordinates = GetPointCoordinates(pointsDataState, point.cityId.id, CITY_KEY);
        const markerCoordinates = GetPointCoordinates(pointsDataState, point.id, MARKER_KEY);
        changeLocationData(point.cityId.name, cityCoordinates, point.cityId.id, CITY_KEY);
        changeLocationData(point.address, markerCoordinates, point.id, MARKER_KEY);
      }
    });
  }, [marker]);

  useEffect(() => {
    if (citiesMenuActive && markerMenuActive) setMarkerMenuActive(false);
  }, [citiesMenuActive, markerMenuActive]);

  const handleCityInput = (event: BaseSyntheticEvent) => {
    if (event.target.value !== EMPTY_STRING && cyrillicRegexp.exec(event.target.value)) {
      setCity(event.target.value);
      setCitiesMenuActive(true);
    } else {
      setCity(EMPTY_STRING);
      setCitiesMenuActive(false);
    }
  };

  const handleCityListItemClick = (event: BaseSyntheticEvent) => {
    setCity(event.target.innerText);
    setCitiesMenuActive(false);
  };

  const handleMarkerListItemClick = (event: BaseSyntheticEvent) => {
    setMarker(event.target.innerText);
    setMarkerMenuActive(false);
  };

  const handleCityBtnClick = () => {
    setCity(EMPTY_STRING);
    setMarker(EMPTY_STRING);
    changeLocationData(EMPTY_STRING, EMPTY_ARRAY, EMPTY_STRING, MARKER_KEY);
    changeLocationData(EMPTY_STRING, MOSCOW_CITY_COORDS, EMPTY_STRING, CITY_KEY);
    setCitiesMenuActive(false);
    setMarkerMenuActive(false);
    dispatch(changeLocTabStateAction(false));
    dispatch(changeModelTabStateAction(false));
    dispatch(changeAdvTabStateAction(false));
    dispatch(resetCarInfoAction());
    dispatch(resetRadioBtnAction());
  };

  const handleMarkerBtnClick = () => {
    setMarker(EMPTY_STRING);
    changeLocationData(EMPTY_STRING, EMPTY_ARRAY, EMPTY_STRING, MARKER_KEY);
    setCitiesMenuActive(false);
    dispatch(changeLocTabStateAction(false));
    dispatch(changeModelTabStateAction(false));
    dispatch(changeAdvTabStateAction(false));
    dispatch(resetCarInfoAction());
    dispatch(resetRadioBtnAction());
  };

  const handleCityInputClick = () => {
    setCitiesMenuActive(!citiesMenuActive);
  };

  const handleMarkerInputClick = () => {
    setMarkerMenuActive(!markerMenuActive);
  };

  return (
    <div className="location-tab">
      <div className="location-tab__point">
        <InputField
          id="city-field"
          title="Город"
          fieldValue={city}
          placeholder="Начните вводить город..."
          onInputFunc={handleCityInput}
          onClickInputFunc={handleCityInputClick}
          onClickBtnFunc={handleCityBtnClick}
          childComponent={(
            <DropDownMenu
              pointData={pointsDataState}
              isActive={citiesMenuActive}
              onClickFunc={handleCityListItemClick}
              cityName={city}
            />
          )}
        />
        <InputField
          id="marker-field"
          title="Пункт выдачи"
          fieldValue={marker}
          placeholder="Выберите пункт выдачи..."
          onClickInputFunc={handleMarkerInputClick}
          onClickBtnFunc={handleMarkerBtnClick}
          childComponent={(
            <DropDownMenu
              pointData={pointsDataState}
              isActive={markerMenuActive}
              onClickFunc={handleMarkerListItemClick}
            />
          )}
        />
      </div>
      <YandexMaps />
    </div>
  );
};

export default connect(
  (state: IState) => ({
    cityName: state.orderInfo.location.cityName,
    markerName: state.orderInfo.location.markerName,
  }),
  (dispatch) => ({
    changeLocationData: bindActionCreators(changeLocationDataAction, dispatch),
  }),
)(LocationTab);
