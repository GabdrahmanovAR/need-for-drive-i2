import React, { useEffect } from 'react';
import './AdminContent.scss';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import OrdersInfo from './orders-info/OrdersInfo';
import ListOfCars from './list-of-cars/ListOfCars';
import CarCard from './car-card/CarCard';
import ErrorPage from './error-page/ErrorPage';
import { successfullSaveSelector } from '../../selectors/successfulSaveSelector';
import { successfullSaveStateAction } from '../../redux/actions/SuccessfullSaveAction';
import { adminSidebarMenuSelector } from '../../selectors/adminSidebarMenuSelector';
import PickUpPoints from './pick-up-point/PickUpPoint';
// eslint-disable-next-line import/no-named-as-default-member
import Category from './category/Category';
import ListOfRates from './list-of-rates/ListOfRates';

const AdminContent = () => {
  const successfulSaveState = useSelector(successfullSaveSelector);
  const adminSidebarState = useSelector(adminSidebarMenuSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminSidebarState.selectedMenu !== 'car' && successfulSaveState.isActive) {
      dispatch(successfullSaveStateAction(false));
    }
  }, [adminSidebarState.selectedMenu]);

  const switchContent = (menuValue: string) => {
    switch (menuValue) {
      case 'orders': return <OrdersInfo />;
      case 'list-of-cars': return <ListOfCars />;
      case 'car': return <CarCard />;
      case 'points': return <PickUpPoints />;
      case 'category': return <Category />;
      case 'rate': return <ListOfRates />;
      default: return <ErrorPage />;
    }
  };

  return (
    <main className="admin-content">
      <Sidebar />
      <section className="admin-content__main">
        <Header />
        <div className="admin-content__main__container">
          {switchContent(adminSidebarState.selectedMenu)}
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
