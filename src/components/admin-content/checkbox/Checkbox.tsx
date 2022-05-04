import React, { FC, useState } from 'react';
import cn from 'classnames';
import deleteIcon from '../../../assets/icons/menu_close_btn_black.svg';
import './Checkbox.scss';
import { formatString } from '../../../utils/FormatString';

interface ICheckboxProps {
  text: string;
  onRemove: (item: string) => void;
}

const Checkbox: FC<ICheckboxProps> = ({ text, onRemove }) => {
  const [deleteIconVisible, setDeleteIconVisible] = useState(false);

  const classNameIcon = cn('colors-delete-icon', {
    'colors-delete-icon_visible': deleteIconVisible,
  });

  const handleColorFieldHover = () => {
    setDeleteIconVisible(true);
  };

  const handleColorFieldMouseLeave = () => {
    setDeleteIconVisible(false);
  };

  const handleClickDeleteIcon = () => {
    onRemove(text);
  };

  return (
    <div
      className="settings-colors__checkbox__block"
      onMouseEnter={handleColorFieldHover}
      onMouseLeave={handleColorFieldMouseLeave}
    >
      <div className="settings-colors__checkbox__block__value">
        <input type="checkbox" value={text} defaultChecked />
        <span>{formatString(text)}</span>
      </div>
      <img
        className={classNameIcon}
        src={deleteIcon}
        alt="Delete"
        onClick={handleClickDeleteIcon}
        role="presentation"
      />
    </div>
  );
};

export default Checkbox;
