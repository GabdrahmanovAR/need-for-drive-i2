import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import errorImg from '../../assets/images/error.png';
import { MAIN_PAGE_URL_PATH } from '../../constants/common';
import './ErrorMessage.scss';
import { clearOrderInfoAction } from '../../redux/actions/OrderInfoAction';
import { resetRadioBtnAction } from '../../redux/actions/RadioButtonAction';
import { resetTabsStateAction } from '../../redux/actions/OrderStepAction';
import { deleteOrderStatusData } from '../../redux/actions/OrderStatusAction';

const ErrorMessage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteOrderStatusData());
    dispatch(clearOrderInfoAction());
    dispatch(resetRadioBtnAction());
    dispatch(resetTabsStateAction());
  }, []);

  return (
    <div className="error-message">
      <Header customClass="order-page__header" />
      <div className="error-message__title">
        <span>Ошибка</span>
      </div>
      <div className="error-message__info">
        <img src={errorImg} alt="No data" />
        <h2>К сожалению произошла непредвиденная ошибка</h2>
        <Link className="error-message__info__link" to={MAIN_PAGE_URL_PATH}>Попробуйте снова</Link>
      </div>
    </div>
  );
};

export default ErrorMessage;
