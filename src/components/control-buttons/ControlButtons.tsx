import React, { BaseSyntheticEvent } from 'react';
import checkIcon from '../../assets/icons/check-icon.svg';
import rejectIcon from '../../assets/icons/reject-icon.svg';
import editIcon from '../../assets/icons/edit-icon.svg';
import './ControlButtons.scss';

const ControlButtons = () => {
  const handleClickControlButton = (event: BaseSyntheticEvent) => {
    console.log(event.target.innerText);
  };

  return (
    <div className="control-buttons">
      <div className="control-buttons__container">
        <img src={checkIcon} alt="Check" />
        <button
          className="control-buttons__container__button"
          type="button"
          onClick={handleClickControlButton}
        >
          Готово
        </button>
      </div>
      <div className="control-buttons__container">
        <img src={rejectIcon} alt="Reject" />
        <button
          className="control-buttons__container__button"
          type="button"
          onClick={handleClickControlButton}
        >
          Отмена
        </button>
      </div>
      <div className="control-buttons__container">
        <img src={editIcon} alt="Edit" />
        <button
          className="control-buttons__container__button"
          type="button"
          onClick={handleClickControlButton}
        >
          Изменить
        </button>
      </div>
    </div>
  );
};

export default ControlButtons;
