import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Button.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIRM_TAB, EMPTY_STRING, ORDER_LOCATION_URL_PATH } from '../../constants/common';
import Spinner from '../Spinner/Spinner';
import { changeOrderConfirmAction } from '../../redux/actions/OrderConfirmAction';
import { orderStatusSelector } from '../../selectors/orderStatusSelector';
import { deleteOrderByIdAction } from '../../redux/actions/OrderStatusAction';

interface IButtonProps {
  text: string;
  customClass?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  link?: string;
}

const Button: FC<IButtonProps> = (props) => {
  const {
    text,
    customClass = EMPTY_STRING,
    isDisabled,
    isLoading,
    link,
  } = props;
  const path = useNavigate();
  const dispatch = useDispatch();
  const locationPath = useLocation();
  const orderStatusState = useSelector(orderStatusSelector);

  const handleButtonClick = () => {
    if (link !== EMPTY_STRING && link === CONFIRM_TAB) {
      dispatch(changeOrderConfirmAction(true));
      document.body.style.overflow = 'hidden';
    } else if (link !== EMPTY_STRING) path(link || EMPTY_STRING);
    if (locationPath.pathname.includes('/orderStatus')) {
      dispatch(deleteOrderByIdAction(orderStatusState.statusInfo.id));
      localStorage.removeItem('orderId');
      path(ORDER_LOCATION_URL_PATH);
    }
  };

  return (
    <button
      type="button"
      className={`${!isDisabled ? 'button' : 'button_disabled'} 
      ${(customClass !== EMPTY_STRING && !isDisabled) && customClass}`}
      disabled={isDisabled}
      onClick={handleButtonClick}
    >
      {isLoading
        ? <Spinner customClass="button__spinner" />
        : <span className={`${!isDisabled ? 'button__text' : 'button__text_disabled'}`}>{text}</span>}
    </button>
  );
};

export default Button;
