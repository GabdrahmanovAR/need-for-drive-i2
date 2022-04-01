import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { orderStatusSelector } from '../../../selectors/orderStatusSelector';
import carImage from '../../../assets/images/car-picture.png';
import './Order.scss';

const Order = () => {
  const orderStatusState = useSelector(orderStatusSelector);

  const {
    cityName,
    pointName,
    name,
    rentalDuration,
    carColor,
    image,
  } = {
    cityName: orderStatusState.statusInfo.cityName,
    pointName: orderStatusState.statusInfo.pointName,
    name: orderStatusState.statusInfo.car.name,
    rentalDuration: {
      from: moment(orderStatusState.statusInfo.dateFrom).format('DD MMMM YYYY'),
      to: moment(orderStatusState.statusInfo.dateTo).format('DD MMMM YYYY'),
    },
    carColor: orderStatusState.statusInfo.color,
    image: orderStatusState.statusInfo.car.image,
  };

  return (
    <div className="admin-order">
      <section className="admin-order__car-img">
        <img src={image || carImage} alt="Car Model" />
      </section>
      <section className="admin-order__info">
        <div>{`${name.toUpperCase() || 'Автомобиль'} в ${cityName}, ${pointName}`}</div>
        <div>{`${rentalDuration.from} - ${rentalDuration.to}`}</div>
        <div>{`Цвет: ${carColor}`}</div>
      </section>
    </div>
  );
};

export default Order;
