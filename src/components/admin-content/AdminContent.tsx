import React from 'react';
import './AdminContent.scss';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import OrdersMenu from './orders-menu/OrdersMenu';

const AdminContent = () => (
  <main className="admin-content">
    <Sidebar />
    <section className="admin-content__main">
      <Header />
      <div className="admin-content__main__container">
        <OrdersMenu />
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

export default AdminContent;
