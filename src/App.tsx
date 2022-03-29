import React from 'react';
import './App.scss';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import MainPage from './pages/main-page/MainPage';
import SidebarMenu from './components/sidebar/sidebar-menu/SidebarMenu';
import OrderPage from './pages/order-page/OrderPage';
import OrderStatus from './components/order-status/OrderStatus';
import OrderStatusMissing from './components/order-status/order-status-missing/OrderStatusMissing';
import ErrorMessage from './components/error-message/ErrorMessage';

const App = () => (
  <HashRouter>
    <div className="main">
      <Sidebar />
      <SidebarMenu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/order/*" element={<OrderPage />} />
        <Route path="/orderStatus/">
          <Route path=":orderId" element={<OrderStatus />} />
          <Route
            path=""
            element={
                localStorage.getItem('orderId')
                  ? <Navigate to={`/orderStatus/${localStorage.getItem('orderId')}`} />
                  : <OrderStatusMissing />
              }
          />
        </Route>
        <Route path="/error" element={<ErrorMessage />} />
      </Routes>
    </div>
  </HashRouter>
);

export default App;
