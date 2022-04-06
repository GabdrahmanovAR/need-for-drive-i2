import React, { useEffect, useState } from 'react';
import './AdminContent.scss';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import OrdersInfo from './orders-info/OrdersInfo';
import { ADMIN_LOGIN_URL } from '../../constants/api/api';

const AdminContent = () => {
  const [menu, setMenu] = useState('orders');
  const navigate = useNavigate();

  const switchContent = (menuValue: string) => {
    switch (menuValue) {
      case 'orders': return <OrdersInfo />;
      default: return <div>Ошибка</div>;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) navigate(ADMIN_LOGIN_URL);
  }, [localStorage.length]);

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
