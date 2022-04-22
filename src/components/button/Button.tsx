import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Button.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { CONFIRM_TAB, EMPTY_STRING } from '../../constants/common';
import Spinner from '../Spinner/Spinner';
import { changeOrderConfirmAction } from '../../redux/actions/OrderConfirmAction';
import { orderStatusSelector } from '../../selectors/orderStatusSelector';
import { deleteOrderByIdAction } from '../../redux/actions/OrderStatusAction';
import { ORDER_LOCATION_URL_PATH } from '../../constants/routes';

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

  const classNameButton = cn({
    button: !isDisabled,
    button_disabled: isDisabled,
    [customClass]: customClass !== EMPTY_STRING && !isDisabled,
  });

  const classNameButtonText = cn({
    button__text: !isDisabled,
    button__text_disabled: isDisabled,
  });

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
      className={classNameButton}
      disabled={isDisabled}
      onClick={handleButtonClick}
    >
      {isLoading
        ? <Spinner customClass="button__spinner" />
        : <span className={classNameButtonText}>{text}</span>}
    </button>
  );
};

export default Button;
