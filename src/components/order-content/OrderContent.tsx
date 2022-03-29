import React from 'react';
import './OrderContent.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import OrderInfo from './order-info/OrderInfo';
import OrderLocation from './location-tab/LocationTab';
import CarsTab from './cars-tab/CarsTab';
import AdvancedTab from './advanced-tab/AdvancedTab';
import ResultTab from './result-tab/ResultTab';
import { ORDER_LOCATION_URL_PATH } from '../../constants/common';

const OrderContent = () => (
  <section className="order-content">
    <Routes>
      <Route path="/location" element={<OrderLocation />} />
      <Route path="/models" element={<CarsTab />} />
      <Route path="/advanced" element={<AdvancedTab />} />
      <Route path="/result" element={<ResultTab />} />
      <Route path="/" element={<Navigate to={ORDER_LOCATION_URL_PATH} />} />
    </Routes>
    <OrderInfo />
  </section>
);

export default OrderContent;
