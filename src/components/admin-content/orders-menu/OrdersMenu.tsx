import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { adminGetCarOrderAction } from '../../../redux/actions/OrderStatusAction';
import { orderStatusSelector } from '../../../selectors/orderStatusSelector';
import { DEFAULT_PAGE_LIMIT } from '../../../constants/common';
import Spinner from '../../Spinner/Spinner';
import Order from '../order/Order';
import './OrderMenu.scss';

const OrdersMenu = () => {
  const orderStatusState = useSelector(orderStatusSelector);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(adminGetCarOrderAction(1));
    }
  }, []);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
    dispatch(adminGetCarOrderAction(page));
  };

  return (
    <main className="order-menu">
      <h2>Заказы</h2>
      <section className="order-menu__info">
        <div className="order-menu__info__edit" />
        <div className="order-menu__info__status">
          {orderStatusState.loading ? <Spinner />
            : <Order />}
        </div>
        <div className="order-menu__info__pagination">
          <Pagination
            current={currentPage}
            size="small"
            total={orderStatusState.count}
            showSizeChanger={false}
            pageSize={DEFAULT_PAGE_LIMIT}
            onChange={handlePaginationChange}
            showQuickJumper={orderStatusState.count > 50}
          />
        </div>
      </section>
    </main>
  );
};

export default OrdersMenu;
