import React, { useEffect } from 'react';
import './OrderPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import OrderContent from '../../components/order-content/OrderContent';
import Header from '../../components/header/Header';
import OrderStep from '../../components/order-step/OrderStep';
import { getPointsAction } from '../../redux/actions/PointsDataAction';
import { pointsDataSelector } from '../../selectors/pointsDataSelector';
import { ORDER_STATUS_URL_PATH } from '../../constants/common';
import OrderStatus from '../../components/order-status/OrderStatus';

const OrderPage = () => {
  const dispatch = useDispatch();
  const pointsDataState = useSelector(pointsDataSelector);
  const locationPath = useLocation();

  useEffect(() => {
    if (pointsDataState.data.length === 0) {
      dispatch(getPointsAction());
    }
  }, []);

  if (locationPath.pathname === ORDER_STATUS_URL_PATH) {
    return (
      <main className="order-page">
        <Header customClass="order-page__header" />
        <OrderStatus />
      </main>
    );
  }

  return (
    <main className="order-page">
      <ErrorBoundary FallbackComponent={() => <Navigate to="/error" />}>
        <Header customClass="order-page__header" />
        <OrderStep />
        <OrderContent />
      </ErrorBoundary>
    </main>
  );
};

export default OrderPage;
