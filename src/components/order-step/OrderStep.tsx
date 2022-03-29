import React from 'react';
import './OrderStep.scss';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import nextStepIcon from '../../assets/icons/location-arrow.svg';
import { orderStepSelector } from '../../selectors/orderStepSelector';
import {
  ADVANCED_URL_PATH, MODELS_URL_PATH, ORDER_LOCATION_URL_PATH, RESULT_URL_PATH,
} from '../../constants/common';

const OrderStep = () => {
  const orderStepState = useSelector(orderStepSelector);
  const location = useLocation();
  const path = useNavigate();

  const handleListItemClick = (link: string, linkAvailable: boolean) => {
    if (linkAvailable) path(link);
  };

  return (
    <section className="order-step">
      <nav className="order-step__nav">
        <ul className="order-step__nav__list">
          <li className={`
            ${location.pathname === ORDER_LOCATION_URL_PATH && 'order-step__nav__list_active'} 
            ${orderStepState.locationTabCompleted && 'order-step__nav__list_completed'}`}
          >
            <a
              role="presentation"
              onClick={() => handleListItemClick(ORDER_LOCATION_URL_PATH, orderStepState.locationTabCompleted)}
            >
              Местоположение
            </a>
            <img src={nextStepIcon} alt="Step Icon" />
          </li>
          <li className={`
          ${location.pathname === MODELS_URL_PATH && 'order-step__nav__list_active'}
          ${orderStepState.locationTabCompleted && 'order-step__nav__list_completed'}`}
          >
            <a
              role="presentation"
              onClick={() => handleListItemClick(MODELS_URL_PATH, orderStepState.locationTabCompleted)}
            >
              Модель
            </a>
            <img src={nextStepIcon} alt="Step Icon" />
          </li>
          <li className={`
            ${location.pathname === ADVANCED_URL_PATH && 'order-step__nav__list_active'}
            ${orderStepState.modelTabCompleted && 'order-step__nav__list_completed'}`}
          >
            <a
              role="presentation"
              onClick={() => handleListItemClick(ADVANCED_URL_PATH, orderStepState.modelTabCompleted)}
            >
              Дополнительно
            </a>
            <img src={nextStepIcon} alt="Step Icon" />
          </li>
          <li className={`
          ${location.pathname === RESULT_URL_PATH && 'order-step__nav__list_active'}
          ${orderStepState.advancedTabCompleted && 'order-step__nav__list_completed'}`}
          >
            <a
              role="presentation"
              onClick={() => handleListItemClick(RESULT_URL_PATH, orderStepState.advancedTabCompleted)}
            >
              Итого
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default OrderStep;
