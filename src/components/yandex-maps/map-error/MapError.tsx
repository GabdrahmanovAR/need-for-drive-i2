import React from 'react';
import './MapError.scss';

export const MapError = () => (
  <div className="map-error">
    <span>Что-то пошло не так, </span>
    <span>координаты пунктов не получены.</span>
    <span>Для корректной работы перезагрузите страницу.</span>
  </div>
);
