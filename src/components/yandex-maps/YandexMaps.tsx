import React, { useEffect, useState } from 'react';
import {
  Clusterer, Map, Placemark, YMaps, YMapsApi,
} from 'react-yandex-maps';
import './YandexMaps.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocationDataAction } from '../../redux/actions/OrderInfoAction';
import { orderInfoSelector } from '../../selectors/orderInfoSelector';
import {
  CITY_KEY, EMPTY_ARRAY, EMPTY_STRING, MARKER_KEY,
} from '../../constants/common';
import { pointsDataSelector } from '../../selectors/pointsDataSelector';
import { GetCoordinates } from '../../utils/GetCoordinates';
import { IPointCityCoordsState, IPointMarkerCoordsState } from '../../types/state';
import { changeCityCoords, changeMarkerCoords } from '../../redux/actions/PointsDataAction';
import { IPoint } from '../../types/api';
import { YMAPS_API_KEY } from '../../constants/api/api';
import { MapError } from './map-error/MapError';

const YandexMaps = () => {
  const { location } = useSelector(orderInfoSelector);
  const pointsDataState = useSelector(pointsDataSelector);
  const dispatch = useDispatch();
  const [someCityCoords, setSomeCityCoords] = useState([] as IPointCityCoordsState[]);
  const [someMarkerCoords, setSomeMarkerCoords] = useState([] as IPointMarkerCoordsState[]);
  const [resultReceived, setResultReceived] = useState(true);

  const handleMarkerClick = (clickedMarkerId: string, markerCoords: number[]) => {
    let markerName = EMPTY_STRING;
    let markerId = EMPTY_STRING;
    let cityOfMarker = EMPTY_STRING;
    let cityIdOfMarker = EMPTY_STRING;
    let markerCityCoords: number[] = [];

    pointsDataState.data.forEach((point: IPoint) => {
      if (point.id === clickedMarkerId) {
        markerName = point.address;
        markerId = point.id;
        cityOfMarker = point.cityId.name;
        cityIdOfMarker = point.cityId.id;
      }
    });

    pointsDataState.cityCoords.forEach((city: IPointCityCoordsState) => {
      if (city.id === cityIdOfMarker) {
        markerCityCoords = city.coordinates;
      }
    });

    dispatch(changeLocationDataAction(cityOfMarker, markerCityCoords, cityIdOfMarker, CITY_KEY));
    dispatch(changeLocationDataAction(markerName, markerCoords, markerId, MARKER_KEY));
  };

  const handleOnLoadMap = (maps: YMapsApi) => {
    const array: any = GetCoordinates(maps, pointsDataState.data);
    array.then((result: any) => {
      if (result[0].length === 0 || result[1].length === 0) setResultReceived(false);
      else {
        setSomeCityCoords(result[0]);
        setSomeMarkerCoords(result[1]);
      }
    });
  };

  useEffect(() => {
    if (someCityCoords.length !== 0 && someMarkerCoords.length !== 0) {
      dispatch(changeCityCoords(someCityCoords));
      dispatch(changeMarkerCoords(someMarkerCoords));
    }
  }, [someCityCoords, someMarkerCoords]);

  return (
    <section className="maps">
      <header className="maps__header">Выбрать на карте:</header>
      <main className="maps__content">
        <YMaps
          query={{
            ns: 'use-load-option',
            apikey: YMAPS_API_KEY,
            load: 'geocode',
          }}
        >
          <Map
            onLoad={handleOnLoadMap}
            state={{
              center: location.markerCoords === EMPTY_ARRAY ? location.cityCoords : location.markerCoords,
              zoom: location.markerCoords === EMPTY_ARRAY ? 9 : 14,
            }}
            height="45vh"
            width="100%"
            modules={['geocode']}
          >
            <Clusterer options={{ preset: 'islands#darkGreenClusterIcons' }}>
              {pointsDataState.markerCoords.map((marker: IPointCityCoordsState, index: number) => (
                <Placemark
                  geometry={marker.coordinates}
                  options={{ preset: 'islands#darkGreenCircleDotIcon' }}
                  onClick={() => handleMarkerClick(marker.id, marker.coordinates)}
                  key={`marker-${index}`}
                />
              ))}
            </Clusterer>
          </Map>
        </YMaps>
        {!resultReceived && <MapError />}
      </main>
    </section>
  );
};

export default YandexMaps;
