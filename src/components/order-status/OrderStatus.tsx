import React, { useEffect } from 'react';
import './OrderStatus.scss';
import { useDispatch, useSelector } from 'react-redux';
import ResultTab from '../order-content/result-tab/ResultTab';
import OrderInfo from '../order-content/order-info/OrderInfo';
import { orderStatusSelector } from '../../selectors/orderStatusSelector';
import { getOrderStatusByIdAction } from '../../redux/actions/OrderStatusAction';
import { EMPTY_STRING } from '../../constants/common';
import Spinner from '../Spinner/Spinner';
import Header from '../header/Header';

const OrderStatus = () => {
  const orderStatusState = useSelector(orderStatusSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('orderId') && orderStatusState.statusInfo.id === EMPTY_STRING) {
      dispatch(getOrderStatusByIdAction(localStorage.getItem('orderId') || EMPTY_STRING));
    }
  }, []);

  return (
    <main className="order-status">
      <Header customClass="order-page__header" />
      <section className="order-status__number">
        {`Заказ номер ${orderStatusState.statusInfo.id}`}
      </section>
      {orderStatusState.loading ? <Spinner />
        : (
          <section className="order-status__info">
            <ResultTab />
            <OrderInfo />
          </section>
        )}
    </main>
  );
};

export default OrderStatus;
