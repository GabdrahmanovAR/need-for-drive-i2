import React from 'react';
import './OrderStep.scss';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import nextStepIcon from '../../assets/icons/location-arrow.svg';
import { orderStepSelector } from '../../selectors/orderStepSelector';
import {
  ADVANCED_URL_PATH, MODELS_URL_PATH, ORDER_LOCATION_URL_PATH, RESULT_URL_PATH,
} from '../../constants/routes';

const OrderStep = () => {
  const orderStepState = useSelector(orderStepSelector);
  const location = useLocation();
  const path = useNavigate();

  const handleListItemClick = (link: string, linkAvailable: boolean) => {
    if (linkAvailable) path(link);
  };

  const classNameLocationTab = cn({
    'order-step__nav__list_active': location.pathname === ORDER_LOCATION_URL_PATH,
    'order-step__nav__list_completed': orderStepState.locationTabCompleted,
  });

  const classNameModelTab = cn({
    'order-step__nav__list_active': location.pathname === MODELS_URL_PATH,
    'order-step__nav__list_completed': orderStepState.locationTabCompleted,
  });

  const classNameAdvancedTab = cn({
    'order-step__nav__list_active': location.pathname === ADVANCED_URL_PATH,
    'order-step__nav__list_completed': orderStepState.modelTabCompleted,
  });

  const classNameResultTab = cn({
    'order-step__nav__list_active': location.pathname === RESULT_URL_PATH,
    'order-step__nav__list_completed': orderStepState.advancedTabCompleted,
  });

  return (
    <section className="order-step">
      <nav className="order-step__nav">
        <ul className="order-step__nav__list">
          <li className={classNameLocationTab}>
            <a
              role="presentation"
              onClick={() => handleListItemClick(ORDER_LOCATION_URL_PATH, orderStepState.locationTabCompleted)}
            >
              Местоположение
            </a>
            <img src={nextStepIcon} alt="Step Icon" />
          </li>
          <li className={classNameModelTab}>
            <a
              role="presentation"
              onClick={() => handleListItemClick(MODELS_URL_PATH, orderStepState.locationTabCompleted)}
            >
              Модель
            </a>
            <img src={nextStepIcon} alt="Step Icon" />
          </li>
          <li className={classNameAdvancedTab}>
            <a
              role="presentation"
              onClick={() => handleListItemClick(ADVANCED_URL_PATH, orderStepState.modelTabCompleted)}
            >
              Дополнительно
            </a>
            <img src={nextStepIcon} alt="Step Icon" />
          </li>
          <li className={classNameResultTab}>
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
