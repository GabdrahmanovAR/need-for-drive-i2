import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../header/Header';
import './OrderStatusMissing.scss';
import { ORDER_LOCATION_URL_PATH } from '../../../constants/common';
import noDataImg from '../../../assets/images/no-data.png';

const OrderStatusMissing = () => (
  <div className="order-missing">
    <Header customClass="order-page__header" />
    <div className="order-missing__title">
      <span>Номер заказа отсутствует</span>
    </div>
    <div className="order-missing__info">
      <img src={noDataImg} alt="No data" />
      <h2>У вас нет зарегистрированных заказов</h2>
      <Link className="order-missing__info__link" to={ORDER_LOCATION_URL_PATH}>Перейти к оформлению заказа</Link>
    </div>
  </div>
);

export default OrderStatusMissing;
