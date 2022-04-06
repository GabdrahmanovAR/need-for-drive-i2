import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { orderStatusSelector } from '../../../selectors/orderStatusSelector';
import carImage from '../../../assets/images/car-picture.png';
import './Order.scss';
import RadioButton from '../../radio-button/RadioButton';
import { radioBtnAdvIdAction } from '../../../redux/actions/RadioButtonAction';
import ControlButtons from '../../control-buttons/ControlButtons';

const Order = () => {
  const orderStatusState = useSelector(orderStatusSelector);
  const dispatch = useDispatch();

  const {
    cityName,
    pointName,
    name,
    rentalDuration,
    carColor,
    image,
    price,
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
    price: orderStatusState.statusInfo.price,
  };

  useEffect(() => {
    if (orderStatusState.statusInfo.isFullTank) dispatch(radioBtnAdvIdAction('checkbox-advanced-0'));
    if (orderStatusState.statusInfo.isNeedChildChair) dispatch(radioBtnAdvIdAction('checkbox-advanced-1'));
    if (orderStatusState.statusInfo.isRightWheel) dispatch(radioBtnAdvIdAction('checkbox-advanced-2'));
  }, []);

  return (
    <div className="admin-order">
      <div className="admin-order__car">
        <section className="admin-order__car__car-img">
          <img src={image || carImage} alt="Car Model" />
        </section>
        <section className="admin-order__car__info">
          <div>
            <span><strong>{name.toUpperCase() || 'Автомобиль'}</strong></span>
            <span className="dim-text"> в </span>
            <span><strong>{cityName}</strong></span>
            <span className="dim-text">{`, ${pointName}`}</span>
          </div>
          <div className="dim-text">{`${rentalDuration.from} - ${rentalDuration.to}`}</div>
          <div>
            <span className="dim-text">Цвет: </span>
            <span><strong>{carColor}</strong></span>
          </div>
        </section>
      </div>
      <section className="admin-order__radio-buttons">
        <RadioButton
          formName="advanced"
          btnNames={['Полный бак, 500₽', 'Детское кресло, 200₽', 'Правый руль, 1600₽']}
          type="checkbox"
          direction="column"
        />
      </section>
      <section className="admin-order__price">
        <h2>{`${price} ₽`}</h2>
      </section>
      <section className="admin-order__control-buttons">
        <ControlButtons />
      </section>
    </div>
  );
};

export default Order;
