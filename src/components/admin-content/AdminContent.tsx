import React, { useState } from 'react';
import './AdminContent.scss';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import OrdersInfo from './orders-info/OrdersInfo';
import EntityList from './entity-list/EntityList';
import CarCard from './car-card/CarCard';
import ErrorPage from './error-page/ErrorPage';

const AdminContent = () => {
  const [menu, setMenu] = useState('orders');

  const switchContent = (menuValue: string) => {
    switch (menuValue) {
      case 'orders': return <OrdersInfo />;
      case 'list-of-entities': return <EntityList />;
      case 'car': return <CarCard />;
      default: return <ErrorPage />;
    }
  };

  return (
    <main className="admin-content">
      <Sidebar setMenu={setMenu} />
      <section className="admin-content__main">
        <Header />
        <div className="admin-content__main__container">
          {switchContent(menu)}
        </div>
        <footer className="admin-content__main__footer admin-footer">
          <div className="admin-footer__links">
            <a href="/need-for-drive-i2">Главная страница</a>
            <a>Ссылка</a>
          </div>
          <div className="admin-footer__copyright">Copyright © 2020 Simbirsoft</div>
        </footer>
      </section>
    </main>
  );
};

export default AdminContent;
