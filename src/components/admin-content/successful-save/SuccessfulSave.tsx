import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { CheckOutlined } from '@ant-design/icons';
import closeIcon from '../../../assets/icons/menu_close_btn.svg';
import './SuccessfulSave.scss';
import { successfullSaveSelector } from '../../../selectors/successfulSaveSelector';
import { successfullSaveStateAction } from '../../../redux/actions/SuccessfullSaveAction';
import { EMPTY_STRING } from '../../../constants/common';

const SuccessfulSave = () => {
  const { message, isActive } = useSelector(successfullSaveSelector);
  const dispatch = useDispatch();

  const classNameBlockState = cn('success-save', {
    'success-save_visible': isActive,
  });

  const handleCloseButtonClick = () => {
    dispatch(successfullSaveStateAction(EMPTY_STRING, false));
  };

  return (
    <div className={classNameBlockState}>
      <div>
        <CheckOutlined />
        <p>{`Успех! ${message}`}</p>
      </div>
      <button
        type="button"
        onClick={handleCloseButtonClick}
      >
        <img src={closeIcon} alt="Закрыть" />
      </button>
    </div>
  );
};

export default SuccessfulSave;
