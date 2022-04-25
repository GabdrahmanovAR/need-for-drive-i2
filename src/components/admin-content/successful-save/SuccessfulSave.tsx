import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { CheckOutlined } from '@ant-design/icons';
import closeIcon from '../../../assets/icons/menu_close_btn.svg';
import './SuccessfulSave.scss';
import { successfullSaveSelector } from '../../../selectors/successfulSaveSelector';
import { successfullSaveStateAction } from '../../../redux/actions/SuccessfullSaveAction';

const SuccessfulSave = () => {
  const successfulSaveState = useSelector(successfullSaveSelector);
  const dispatch = useDispatch();

  const classNameBlockState = cn('success-save', {
    'success-save_visible': successfulSaveState.isActive,
  });

  const handleCloseButtonClick = () => {
    dispatch(successfullSaveStateAction(false));
  };

  return (
    <div className={classNameBlockState}>
      <div>
        <CheckOutlined />
        <p>Успех! Машина сохранена</p>
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
