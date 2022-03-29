import React, { useEffect } from 'react';
import './OrderConfirm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../button/Button';
import { orderConfirmSelector } from '../../../selectors/orderConfirmSelector';
import { changeOrderConfirmAction } from '../../../redux/actions/OrderConfirmAction';
import { orderInfoSelector } from '../../../selectors/orderInfoSelector';
import { orderStatusAction } from '../../../redux/actions/OrderStatusAction';
import { orderStatusSelector } from '../../../selectors/orderStatusSelector';
import { EMPTY_STRING, ORDER_STATUS_URL_PATH } from '../../../constants/common';

const OrderConfirm = () => {
  const orderConfirmState = useSelector(orderConfirmSelector);
  const orderInfo = useSelector(orderInfoSelector);
  const orderStatusState = useSelector(orderStatusSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderStatusState.statusInfo.id !== EMPTY_STRING) {
      navigate(`${ORDER_STATUS_URL_PATH}/${orderStatusState.statusInfo.id}`);
    }
  }, [orderStatusState.statusInfo.id]);

  const handleConfirmBtnClick = () => {
    dispatch(orderStatusAction(orderInfo));
  };

  const handleCancelBtnClick = () => {
    dispatch(changeOrderConfirmAction(false));
    document.body.style.overflow = 'unset';
  };

  return (
    <div className={`order-confirm ${orderConfirmState.isActive && 'order-confirm_active'}`}>
      <div className="order-confirm__block">
        <h1 className="order-confirm__block__title">Подтвердить заказ</h1>
        <div className="order-confirm__block__buttons">
          <div onClick={handleConfirmBtnClick} role="presentation">
            <Button
              text="Подтвердить"
              isLoading={orderStatusState.loading}
            />
          </div>
          <div className="cancel-button" onClick={handleCancelBtnClick} role="presentation">
            <Button
              text="Вернуться"
              customClass="order-confirm__cancel-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
